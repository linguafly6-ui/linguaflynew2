import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cf-context";
import { getStudent } from "@/lib/student-auth";
import { transcribeAudio, calculateSimilarity, detectRecognitionIssues, generateFeedback } from "@/lib/pronunciation";

const GUEST_RATE_LIMIT_PER_MINUTE = 30;
const FREE_DAILY_LIMIT = 10;

async function getGuestQuotaId(request: NextRequest) {
  // Cloudflare supplies this header at the edge; store only its SHA-256 digest.
  const ip = request.headers.get("cf-connecting-ip");
  if (!ip) throw new Error("No se ha podido identificar el origen de la petición.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  return "guest-" + hash;
}

const BRITISH_TIPS: Record<string, { ipa: string; cue: string; tip: string }> = {
  name: { ipa: "/neɪm/", cue: "NAYM", spanishCue: "NÉIM", tip: "Desliza desde /e/ hacia una i breve." },
  age: { ipa: "/eɪdʒ/", cue: "AYJ", spanishCue: "ÉICH", tip: "Termina con /dʒ/, como el sonido inicial de job." },
  hello: { ipa: "/həˈləʊ/", cue: "huh-LOH", spanishCue: "he-LÓU", tip: "Aspira suavemente la h inicial y acentúa la segunda sílaba." },
  surname: { ipa: "/ˈsɜː.neɪm/", cue: "SUR-naym", spanishCue: "SÉR-néim", tip: "Acentúa la primera sílaba; no pronuncies una r fuerte." },
  address: { ipa: "/əˈdres/", cue: "uh-DRESS", spanishCue: "a-DRÉS", tip: "En esta pronunciación, el acento cae en la segunda sílaba." },
  city: { ipa: "/ˈsɪt.i/", cue: "SIT-ee", spanishCue: "SÍ-ti", tip: "La primera vocal es corta /ɪ/, no una i española larga." },
  country: { ipa: "/ˈkʌn.tri/", cue: "KUN-tree", spanishCue: "KÁN-tri", tip: "Usa la vocal central /ʌ/ en la primera sílaba." },
  good: { ipa: "/ɡʊd/", cue: "GOOD", spanishCue: "GUD", tip: "La vocal /ʊ/ es corta y relajada." },
  morning: { ipa: "/ˈmɔː.nɪŋ/", cue: "MAW-ning", spanishCue: "MÓO-ning", tip: "Alarga /ɔː/ y termina con el sonido nasal /ŋ/." },
  goodbye: { ipa: "/ˌɡʊdˈbaɪ/", cue: "good-BYE", spanishCue: "gud-BÁI", tip: "El acento principal está en la segunda parte." },
  please: { ipa: "/pliːz/", cue: "PLEEZ", spanishCue: "PLÍIZ", tip: "Alarga /iː/ y termina con /z/ sonora." },
  Spain: { ipa: "/speɪn/", cue: "SPAYN", spanishCue: "SPÉIN", tip: "Empieza con /sp/ sin añadir una vocal delante." },
  Spanish: { ipa: "/ˈspæn.ɪʃ/", cue: "SPAN-ish", spanishCue: "SPÁ-nish", tip: "Acentúa la primera sílaba y termina con /ʃ/." },
  British: { ipa: "/ˈbrɪt.ɪʃ/", cue: "BRIT-ish", spanishCue: "BRÍ-tish", tip: "La primera vocal es corta /ɪ/; termina con /ʃ/." },
  France: { ipa: "/frɑːns/", cue: "FRAHNS", spanishCue: "FRÁANS", tip: "Usa la vocal larga /ɑː/ y termina con /s/." },
  French: { ipa: "/frentʃ/", cue: "FRENCH", spanishCue: "FRENCH", tip: "Termina con la africada /tʃ/, como en chair." },
  letter: { ipa: "/ˈlet.ə/", cue: "LET-uh", spanishCue: "LÉ-ta", tip: "Acentúa la primera sílaba; la r final no se pronuncia." },
  alphabet: { ipa: "/ˈæl.fə.bet/", cue: "AL-fuh-bet", spanishCue: "ÁL-fa-bet", tip: "Acentúa la primera sílaba y mantén las tres sílabas." },
  spell: { ipa: "/spel/", cue: "SPELL", spanishCue: "SPÉL", tip: "Empieza directamente con /sp/ y termina con una /l/ clara." },
  who: { ipa: "/huː/", cue: "HOO", spanishCue: "HÚU", tip: "Alarga /uː/ y deja salir aire en la h inicial." },
  what: { ipa: "/wɒt/", cue: "WOT", spanishCue: "UÓT", tip: "Empieza con /w/ redondeando los labios; la vocal es corta." },
  where: { ipa: "/weə/", cue: "WAIR", spanishCue: "UÉ-a", tip: "Empieza con /w/ y evita una r final fuerte." },
  when: { ipa: "/wen/", cue: "WEN", spanishCue: "UÉN", tip: "Empieza con /w/ y mantén la vocal breve." },
  how: { ipa: "/haʊ/", cue: "HOW", spanishCue: "HÁU", tip: "Aspira la h y realiza el diptongo /aʊ/." },
  teacher: { ipa: "/ˈtiː.tʃə/", cue: "TEE-chuh", spanishCue: "TÍ-cha", tip: "Alarga /iː/ y termina con /tʃə/; la r escrita no se pronuncia." },
  student: { ipa: "/ˈstjuː.dənt/", cue: "STYOO-dent", spanishCue: "STIÚ-dent", tip: "En inglés británico es común el sonido /j/ después de /t/." },
  friend: { ipa: "/frend/", cue: "FREND", spanishCue: "FREND", tip: "Mantén la vocal /e/ breve y termina con /nd/." },
  future: { ipa: "/ˈfjuː.tʃə/", cue: "FYOO-chuh", tip: "Start with /f/, glide into /j/ as in 'yes', then make /tʃ/ as in 'cheese'. Stress the first syllable. In non-rhotic British English, the final r is not pronounced." },
  water: { ipa: "/ˈwɔː.tə/", cue: "WAW-tuh", tip: "Hold the /ɔː/ vowel. In standard non-rhotic British English, do not pronounce the final written r." },
  three: { ipa: "/θriː/", cue: "THREE", tip: "Place the tip of your tongue lightly between your teeth for /θ/. Do not replace it with /t/ or /s/. Keep /iː/ long." },
  thought: { ipa: "/θɔːt/", cue: "THAWT", tip: "Begin with /θ/ (tongue gently between the teeth), sustain /ɔː/, then release a clear final /t/." },
  comfortable: { ipa: "/ˈkʌm.fə.tə.bəl/", cue: "KUM-fuh-tuh-buhl", tip: "A common British pronunciation has four syllables. Stress the first syllable; weaken the unstressed vowels." },
  schedule: { ipa: "/ˈʃed.juːl/", cue: "SHED-yool", tip: "A common British pronunciation begins with /ʃ/ as in 'ship', rather than /sk/. Stress the first syllable." },
  think: { ipa: "/θɪŋk/", cue: "THINK", tip: "Make /θ/ with the tongue tip gently between the teeth and let air pass without voicing." },
  this: { ipa: "/ðɪs/", cue: "THIS", tip: "Make /ð/ in the same tongue position as /θ/, but switch your voice on." },
  ship: { ipa: "/ʃɪp/", cue: "SHIP", tip: "Round your lips slightly and make the continuous /ʃ/ sound; do not stop it like /tʃ/." },
  sheep: { ipa: "/ʃiːp/", cue: "SHEEP", tip: "Keep /iː/ long and distinguish the initial /ʃ/ from /s/." },
  work: { ipa: "/wɜːk/", cue: "WURK", tip: "Use the long central vowel /ɜː/. In non-rhotic British English, do not pronounce a separate r sound." },
  learn: { ipa: "/lɜːn/", cue: "LURN", tip: "Hold /ɜː/ steadily; the written r is not pronounced as a consonant in non-rhotic British English." },
};

function getBritishTip(target: string) {
  const words = target.toLowerCase().match(/[a-z']+/g) || [];
  return words.flatMap(word => {
    const item = BRITISH_TIPS[word];
    return item ? [{ word, ...item }] : [];
  }).slice(0, 5);
}

export async function POST(request: NextRequest) {
  let stage = "session";
  try {
    const student = await getStudent(request);
    stage = "cloudflare-context";
    const env = getEnv();
    const isGuest = !student;
    const quotaId = isGuest ? await getGuestQuotaId(request) : String(student.id);
    const isPro = !!student && (student.plan === "pro" || student.plan === "pro_test");
    const dailyLimit = FREE_DAILY_LIMIT;

    // Additional edge rate limit for anonymous traffic, keyed by the visitor IP.
    if (isGuest && env.AI_RATE_LIMITER) {
      stage = "guest-rate-limit";
      const rate = await env.AI_RATE_LIMITER.limit({ key: quotaId });
      if (!rate.success) return NextResponse.json({ error: "Has alcanzado el límite temporal de grabaciones. Espera un minuto e inténtalo de nuevo." }, { status: 429 });
    }

    stage = "read-audio";
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;
    const targetPhrase = formData.get("targetPhrase") as string;
    const language = (formData.get("language") as string) || "en";
    const phraseId = formData.get("phraseId") as string | null;

    if (!audioFile || !targetPhrase?.trim()) return NextResponse.json({ error: "Faltan audio o targetPhrase" }, { status: 400 });
    if (audioFile.size > 8 * 1024 * 1024) return NextResponse.json({ error: "El audio supera el máximo de 8 MB." }, { status: 413 });
    if (language !== "en") return NextResponse.json({ error: "El Speaking Lab utiliza inglés británico (en)." }, { status: 400 });

    // Logged-in students use their daily D1 quota. Guests are rate-limited at the edge above.
    let usedToday = 0;
    if (!isGuest) {
      if (!env.DB) return NextResponse.json({ error: "El servicio de Speaking no está disponible temporalmente." }, { status: 503 });
      const usage: any = await env.DB.prepare(
        "SELECT COUNT(*) AS total FROM pronunciation_sessions WHERE user_id = ? AND created_at >= datetime('now', '-1 day')"
      ).bind(quotaId).first();
      usedToday = Number(usage?.total ?? 0);
      if (usedToday >= dailyLimit) {
        return NextResponse.json({
          error: `Has alcanzado los ${FREE_DAILY_LIMIT} análisis disponibles en las últimas 24 horas. Vuelve mañana.`,
          quota: { used: usedToday, limit: dailyLimit, plan: isPro ? "pro" : "free" },
        }, { status: 429 });
      }
    }

    const target = targetPhrase.trim().slice(0, 500);
    stage = "workers-ai-transcription";
    const transcription = await transcribeAudio(await audioFile.arrayBuffer(), "en");
    if (!transcription) {
      return NextResponse.json({
        score: 0, scoreLabel: "Coincidencia de transcripción (no es una nota fonética)", transcription: "",
        feedback: "No se ha podido reconocer el audio. Inténtalo de nuevo en un lugar silencioso y habla cerca del micrófono.",
        recognitionIssues: [], phoneticIssues: [], britishTips: getBritishTip(target),
        similarityType: "transcription-only",
        scoreLabel: "Sin transcripción",
        quota: isGuest ? { plan: "guest", limit: GUEST_RATE_LIMIT_PER_MINUTE, period: "minute" } : { used: usedToday + 1, limit: dailyLimit, plan: isPro ? "pro" : "free" },
      });
    }

    stage = "calculate-feedback";
    const score = calculateSimilarity(transcription, target);
    const issues = detectRecognitionIssues(target, transcription);
    const feedback = generateFeedback(score, issues);
    const sessionId = `pron-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Store session history only for authenticated students. Guest audio/transcripts are not persisted.
    if (!isGuest) {
      try {
        await env.DB.prepare(
          `INSERT INTO pronunciation_sessions (id, user_id, phrase_id, target_phrase, target_language, transcription, similarity_score, feedback, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
        ).bind(sessionId, quotaId, phraseId || null, target, "en-GB", transcription, score, feedback).run();
      } catch (dbError) {
        console.error("Failed to save pronunciation session:", dbError);
      }
    }

    stage = "save-session";
    return NextResponse.json({
      sessionId, score, scoreLabel: "Coincidencia de transcripción (no es una nota fonética)", transcription, feedback, recognitionIssues: issues, phoneticIssues: [],
      britishTips: getBritishTip(target),
      similarityType: "transcription-only",
      scoreLabel: "Coincidencia de transcripción (no es una nota fonética)",
      quota: isGuest ? { plan: "guest", limit: GUEST_RATE_LIMIT_PER_MINUTE, period: "minute" } : { used: usedToday + 1, limit: dailyLimit, plan: isPro ? "pro" : "free" },
    });
  } catch (error) {
    console.error(`Pronunciation analyze failed at ${stage}:`, error);
    return NextResponse.json({
      error: stage === "session"
        ? "No se ha podido comprobar la sesión. Inténtalo de nuevo."
        : stage === "cloudflare-context"
          ? "El servicio de Cloudflare no está disponible en este despliegue."
          : stage === "guest-rate-limit"
            ? "No se ha podido comprobar el límite de uso. Inténtalo de nuevo en un momento."
            : stage === "workers-ai-transcription"
              ? "No se ha podido procesar el audio. Prueba a grabar una frase más corta."
              : "Ha fallado el procesamiento de la pronunciación. Inténtalo de nuevo.",
      diagnosticStage: stage,
    }, { status: 500 });
  }
}
