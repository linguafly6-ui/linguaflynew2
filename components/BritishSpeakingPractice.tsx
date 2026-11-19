"use client";

import { useRef, useState } from "react";

type Item = { phrase: string; ipa: string; guide: string; tip: string };
type AnalyzeResponse = {
  error?: string;
  diagnosticStage?: string;
  transcription?: string;
  feedback?: string;
  [key: string]: unknown;
};

const missionItems: Record<string, Item[]> = {
  "001": [{ phrase: "Hello", ipa: "/həˈləʊ/", guide: "huh-LOH", tip: "/h/ suave y diptongo /əʊ/ al final." }, { phrase: "Hi", ipa: "/haɪ/", guide: "HAI", tip: "Una sílaba; desliza /aɪ/ sin añadir otra vocal." }, { phrase: "Good morning", ipa: "/ˌɡʊd ˈmɔː.nɪŋ/", guide: "gud MOR-ning", tip: "Alarga /ɔː/ y no pronuncies la r de morning." }, { phrase: "My name is…", ipa: "/maɪ ˈneɪm ɪz/", guide: "mai NEIM iz", tip: "Enlaza name is sin pausa entre palabras." }, { phrase: "Nice to meet you", ipa: "/ˌnaɪs tə ˈmiːt juː/", guide: "nais tuh MIIT-yoo", tip: "Mantén larga la /iː/ de meet." }, { phrase: "Good afternoon", ipa: "/ˌɡʊd ˌɑːf.təˈnuːn/", guide: "gud aaf-tuh-NUUN", tip: "Acento principal en noon." }, { phrase: "How are you?", ipa: "/haʊ ɑː juː/", guide: "HAU aa yuu", tip: "Une are you con fluidez." }, { phrase: "Nice to meet you.", ipa: "/ˌnaɪs tə ˈmiːt juː/", guide: "nais tuh MIIT-yuu", tip: "Mantén /iː/ larga en meet." }],
  "002": [{ phrase: "one", ipa: "/wʌn/", guide: "UAN", tip: "Vocal /ʌ/ breve; termina con /n/." }, { phrase: "two", ipa: "/tuː/", guide: "TUU", tip: "/t/ clara y /uː/ larga." }, { phrase: "three", ipa: "/θriː/", guide: "THRII", tip: "Coloca la lengua entre los dientes para /θ/." }, { phrase: "four", ipa: "/fɔː/", guide: "FOO", tip: "Vocal larga /ɔː/; la r final no se pronuncia." }, { phrase: "five", ipa: "/faɪv/", guide: "FAIV", tip: "Diptongo /aɪ/ y termina con /v/ sonora." }, { phrase: "six", ipa: "/sɪks/", guide: "SIKS", tip: "Vocal corta /ɪ/ y grupo final /ks/." }, { phrase: "seven", ipa: "/ˈsev.ən/", guide: "SEV-en", tip: "Acento en la primera sílaba; segunda débil." }, { phrase: "eight", ipa: "/eɪt/", guide: "EIT", tip: "Diptongo /eɪ/ y /t/ final." }, { phrase: "nine", ipa: "/naɪn/", guide: "NAIN", tip: "Diptongo /aɪ/ y /n/ final." }, { phrase: "ten", ipa: "/ten/", guide: "TEN", tip: "Vocal /e/ breve, sin alargarla." }, { phrase: "How many?", ipa: "/haʊ ˈmen.i/", guide: "hau ME-ni", tip: "Acento en many." }, { phrase: "I have three.", ipa: "/aɪ hæv θriː/", guide: "ai hav THRII", tip: "Practica /θ/ en three." }, { phrase: "There are ten.", ipa: "/ðeər ɑː ten/", guide: "dhea aa TEN", tip: "/ð/ sonora al inicio de there." }],
  "003": [{ phrase: "red", ipa: "/red/", guide: "RED", tip: "Vocal /e/ breve." }, { phrase: "blue", ipa: "/bluː/", guide: "BLUU", tip: "Mantén larga la /uː/." }, { phrase: "green", ipa: "/ɡriːn/", guide: "GRIIN", tip: "/iː/ larga; termina con /n/." }, { phrase: "yellow", ipa: "/ˈjel.əʊ/", guide: "YEL-oh", tip: "Dos sílabas; acento inicial y final /əʊ/." }, { phrase: "white", ipa: "/waɪt/", guide: "UAIT", tip: "Diptongo /aɪ/." }, { phrase: "black", ipa: "/blæk/", guide: "BLAK", tip: "Vocal /æ/: abre la boca más que para /e/." }, { phrase: "orange", ipa: "/ˈɒr.ɪndʒ/", guide: "OR-inch", tip: "Dos sílabas; termina con /dʒ/." }, { phrase: "pink", ipa: "/pɪŋk/", guide: "PINK", tip: "Vocal breve /ɪ/ y /ŋk/ final." }, { phrase: "purple", ipa: "/ˈpɜː.pəl/", guide: "PER-pəl", tip: "Vocal /ɜː/; la r no se pronuncia." }, { phrase: "brown", ipa: "/braʊn/", guide: "BRAUN", tip: "Diptongo /aʊ/." }, { phrase: "It is red.", ipa: "/ɪt ɪz red/", guide: "it iz RED", tip: "Enlaza it is sin pausa." }, { phrase: "The sky is blue.", ipa: "/ðə skaɪ ɪz bluː/", guide: "dha skai iz BLUU", tip: "/ð/ sonora en the." }, { phrase: "My favourite colour is green.", ipa: "/maɪ ˈfeɪ.vər.ɪt ˈkʌl.ə ɪz ɡriːn/", guide: "mai FEI-vrit KAL-a iz GRIIN", tip: "Acentúa favourite y colour con naturalidad." }],
  "004": [{ phrase: "mother", ipa: "/ˈmʌð.ə/", guide: "MA-dha", tip: "/ð/ sonora: lengua entre dientes; r final ausente." }, { phrase: "father", ipa: "/ˈfɑː.ðə/", guide: "FAA-dha", tip: "Primera vocal larga /ɑː/ y /ð/ sonora." }, { phrase: "sister", ipa: "/ˈsɪs.tə/", guide: "SIS-ta", tip: "Dos sílabas; la r final no se pronuncia." }, { phrase: "brother", ipa: "/ˈbrʌð.ə/", guide: "BRA-dha", tip: "Practica /ð/ con vibración de voz." }, { phrase: "family", ipa: "/ˈfæm.əl.i/", guide: "FAM-uh-li", tip: "Tres sílabas, acento inicial." }, { phrase: "grandmother", ipa: "/ˈɡrænˌmʌð.ə/", guide: "GRAN-ma-dha", tip: "Une grand y mother con naturalidad." }, { phrase: "grandfather", ipa: "/ˈɡrænˌfɑː.ðə/", guide: "GRAN-faa-dha", tip: "Alarga /ɑː/ en father." }, { phrase: "parents", ipa: "/ˈpeə.rənts/", guide: "PEA-rents", tip: "Diptongo /eə/; r no rótica." }, { phrase: "happy", ipa: "/ˈhæp.i/", guide: "HA-pi", tip: "Vocal /æ/ abierta y dos sílabas." }, { phrase: "love", ipa: "/lʌv/", guide: "LAV", tip: "Vocal /ʌ/ breve y /v/ sonora." }, { phrase: "This is my family.", ipa: "/ðɪs ɪz maɪ ˈfæm.əl.i/", guide: "dhis iz mai FAM-uh-li", tip: "/ð/ sonora en this." }, { phrase: "I love my mother.", ipa: "/aɪ lʌv maɪ ˈmʌð.ə/", guide: "ai lav mai MA-dha", tip: "Practica /ʌ/ y /ð/." }, { phrase: "He is my brother.", ipa: "/hiː ɪz maɪ ˈbrʌð.ə/", guide: "hii iz mai BRA-dha", tip: "/ð/ sonora en brother." }],
  "005": [{ phrase: "dog", ipa: "/dɒɡ/", guide: "DOG", tip: "Vocal británica corta /ɒ/." }, { phrase: "cat", ipa: "/kæt/", guide: "KAT", tip: "Vocal /æ/ abierta." }, { phrase: "puppy", ipa: "/ˈpʌp.i/", guide: "PA-pi", tip: "Acento inicial; /ʌ/ breve." }, { phrase: "kitten", ipa: "/ˈkɪt.ən/", guide: "KIT-en", tip: "Dos sílabas, vocal breve." }, { phrase: "bird", ipa: "/bɜːd/", guide: "BERD", tip: "/ɜː/ larga; no pronuncies la r." }, { phrase: "hamster", ipa: "/ˈhæm.stə/", guide: "HAM-sta", tip: "Acento inicial; r final ausente." }, { phrase: "parrot", ipa: "/ˈpær.ət/", guide: "PA-rət", tip: "Primera vocal /æ/." }, { phrase: "goldfish", ipa: "/ˈɡəʊld.fɪʃ/", guide: "GOULD-fish", tip: "Diptongo /əʊ/ y /ʃ/ final." }, { phrase: "turtle", ipa: "/ˈtɜː.təl/", guide: "TER-təl", tip: "/ɜː/ larga sin r audible." }, { phrase: "snake", ipa: "/sneɪk/", guide: "SNEIK", tip: "Diptongo /eɪ/." }, { phrase: "It is a dog.", ipa: "/ɪt ɪz ə dɒɡ/", guide: "it iz uh DOG", tip: "La vocal débil /ə/ es muy corta." }, { phrase: "I have a cat.", ipa: "/aɪ hæv ə kæt/", guide: "ai hav uh KAT", tip: "Une have a sin pausa." }, { phrase: "The bird is small.", ipa: "/ðə bɜːd ɪz smɔːl/", guide: "dha BERD iz SMOOL", tip: "/ɜː/ larga y r no rótica." }],
  "006": [{ phrase: "apple", ipa: "/ˈæp.əl/", guide: "A-pəl", tip: "/æ/ abierta y dos sílabas." }, { phrase: "banana", ipa: "/bəˈnɑː.nə/", guide: "buh-NAA-nuh", tip: "Acento en la sílaba central; /ɑː/ larga." }, { phrase: "bread", ipa: "/bred/", guide: "BRED", tip: "Vocal breve /e/." }, { phrase: "cheese", ipa: "/tʃiːz/", guide: "CHIIZ", tip: "Empieza con /tʃ/ y alarga /iː/." }, { phrase: "water", ipa: "/ˈwɔː.tə/", guide: "UO-ta", tip: "/ɔː/ larga; no se pronuncia r final." }, { phrase: "milk", ipa: "/mɪlk/", guide: "MILK", tip: "Vocal corta /ɪ/." }, { phrase: "juice", ipa: "/dʒuːs/", guide: "YUUS", tip: "Empieza con /dʒ/ y /uː/ larga." }, { phrase: "orange", ipa: "/ˈɒr.ɪndʒ/", guide: "OR-inch", tip: "Termina con el sonido /dʒ/." }, { phrase: "sandwich", ipa: "/ˈsæn.wɪdʒ/", guide: "SAN-uich", tip: "Dos sílabas; /æ/ abierta." }, { phrase: "rice", ipa: "/raɪs/", guide: "RAIS", tip: "Diptongo /aɪ/." }, { phrase: "I like apples.", ipa: "/aɪ laɪk ˈæp.əlz/", guide: "ai laik A-pəlz", tip: "Diptongo /aɪ/ y /æ/." }, { phrase: "I would like water.", ipa: "/aɪ wʊd laɪk ˈwɔː.tə/", guide: "ai wud laik UO-ta", tip: "/ɔː/ larga en water." }, { phrase: "Can I have some juice?", ipa: "/kən aɪ hæv sʌm dʒuːs/", guide: "kən ai hav sam YUUS", tip: "La forma débil can suena /kən/." }],
  "007": [{ phrase: "book", ipa: "/bʊk/", guide: "BUK", tip: "Vocal corta /ʊ/, no /uː/." }, { phrase: "pencil", ipa: "/ˈpen.səl/", guide: "PEN-səl", tip: "Acento inicial; segunda sílaba débil." }, { phrase: "pen", ipa: "/pen/", guide: "PEN", tip: "Vocal /e/ breve." }, { phrase: "ruler", ipa: "/ˈruː.lə/", guide: "RUU-la", tip: "/uː/ larga y r final ausente." }, { phrase: "rubber", ipa: "/ˈrʌb.ə/", guide: "RA-ba", tip: "Vocal /ʌ/ breve." }, { phrase: "bag", ipa: "/bæɡ/", guide: "BAG", tip: "Vocal /æ/ abierta." }, { phrase: "notebook", ipa: "/ˈnəʊt.bʊk/", guide: "NOUT-buk", tip: "Diptongo /əʊ/ en note." }, { phrase: "crayons", ipa: "/ˈkreɪ.ɒnz/", guide: "KREI-onz", tip: "Diptongo /eɪ/." }, { phrase: "teacher", ipa: "/ˈtiː.tʃə/", guide: "TII-cha", tip: "/iː/ larga y /tʃ/." }, { phrase: "student", ipa: "/ˈstjuː.dənt/", guide: "STYUU-dent", tip: "En británico suele aparecer /stj/ al inicio." }, { phrase: "This is my book.", ipa: "/ðɪs ɪz maɪ bʊk/", guide: "dhis iz mai BUK", tip: "/ʊ/ breve en book." }, { phrase: "I have a pencil.", ipa: "/aɪ hæv ə ˈpen.səl/", guide: "ai hav uh PEN-səl", tip: "Acento en la primera sílaba de pencil." }, { phrase: "Open your book.", ipa: "/ˈəʊ.pən jɔː bʊk/", guide: "OU-pən yoh BUK", tip: "Diptongo /əʊ/ en open." }],
  "008": [{ phrase: "head", ipa: "/hed/", guide: "HED", tip: "Vocal breve /e/." }, { phrase: "eyes", ipa: "/aɪz/", guide: "AIZ", tip: "Diptongo /aɪ/ y /z/ sonora." }, { phrase: "ears", ipa: "/ɪəz/", guide: "IAZ", tip: "Diptongo /ɪə/; r no rótica." }, { phrase: "nose", ipa: "/nəʊz/", guide: "NOUZ", tip: "Diptongo /əʊ/." }, { phrase: "mouth", ipa: "/maʊθ/", guide: "MAUTH", tip: "Diptongo /aʊ/ y /θ/ sorda." }, { phrase: "arms", ipa: "/ɑːmz/", guide: "AAMZ", tip: "/ɑː/ larga; r no audible." }, { phrase: "hands", ipa: "/hændz/", guide: "HANDZ", tip: "Vocal /æ/ abierta." }, { phrase: "legs", ipa: "/leɡz/", guide: "LEGZ", tip: "Vocal breve /e/." }, { phrase: "feet", ipa: "/fiːt/", guide: "FIIT", tip: "/iː/ larga." }, { phrase: "body", ipa: "/ˈbɒd.i/", guide: "BO-di", tip: "Dos sílabas y /ɒ/ breve." }, { phrase: "Touch your nose.", ipa: "/tʌtʃ jɔː nəʊz/", guide: "TACH yoh NOUZ", tip: "/tʃ/ en touch y /əʊ/ en nose." }, { phrase: "I have two eyes.", ipa: "/aɪ hæv tuː aɪz/", guide: "ai hav tuu AIZ", tip: "Alarga /uː/ en two." }, { phrase: "Clap your hands.", ipa: "/klæp jɔː hændz/", guide: "klap yoh HANDZ", tip: "Vocal /æ/ abierta en clap y hands." }],
  "009": [{ phrase: "house", ipa: "/haʊs/", guide: "HAUS", tip: "Diptongo /aʊ/." }, { phrase: "kitchen", ipa: "/ˈkɪtʃ.ɪn/", guide: "KI-chin", tip: "Acento inicial y /tʃ/." }, { phrase: "living room", ipa: "/ˈlɪv.ɪŋ ruːm/", guide: "LI-ving RUUM", tip: "Mantén /uː/ larga en room." }, { phrase: "bedroom", ipa: "/ˈbed.ruːm/", guide: "BED-ruum", tip: "Primera vocal breve; segunda larga." }, { phrase: "sofa", ipa: "/ˈsəʊ.fə/", guide: "SOU-fuh", tip: "Diptongo /əʊ/ y schwa final." }, { phrase: "bed", ipa: "/bed/", guide: "BED", tip: "Vocal breve /e/." }, { phrase: "lamp", ipa: "/læmp/", guide: "LAMP", tip: "Vocal /æ/ abierta." }, { phrase: "table", ipa: "/ˈteɪ.bəl/", guide: "TEI-bəl", tip: "Diptongo /eɪ/." }, { phrase: "chair", ipa: "/tʃeə/", guide: "CHEA", tip: "Diptongo /eə/; r final ausente." }, { phrase: "box", ipa: "/bɒks/", guide: "BOKS", tip: "Vocal corta /ɒ/." }, { phrase: "This is my house.", ipa: "/ðɪs ɪz maɪ haʊs/", guide: "dhis iz mai HAUS", tip: "/ð/ sonora y diptongo /aʊ/." }, { phrase: "The sofa is in the living room.", ipa: "/ðə ˈsəʊ.fə ɪz ɪn ðə ˈlɪv.ɪŋ ruːm/", guide: "dha SOU-fuh iz in dha LI-ving RUUM", tip: "Practica la unión de palabras." }, { phrase: "The bed is in the bedroom.", ipa: "/ðə bed ɪz ɪn ðə ˈbed.ruːm/", guide: "dha BED iz in dha BED-ruum", tip: "Mantén /uː/ en room." }],
  "010": [{ phrase: "wake up", ipa: "/weɪk ʌp/", guide: "UEIK AP", tip: "Diptongo /eɪ/ y /ʌ/ breve." }, { phrase: "wash", ipa: "/wɒʃ/", guide: "UOSH", tip: "Vocal corta /ɒ/ y /ʃ/ final." }, { phrase: "eat", ipa: "/iːt/", guide: "IIT", tip: "Alarga /iː/." }, { phrase: "go", ipa: "/ɡəʊ/", guide: "GOU", tip: "Diptongo /əʊ/." }, { phrase: "play", ipa: "/pleɪ/", guide: "PLEI", tip: "Diptongo /eɪ/." }, { phrase: "read", ipa: "/riːd/", guide: "RIID", tip: "/iː/ larga." }, { phrase: "sleep", ipa: "/sliːp/", guide: "SLIIP", tip: "/iː/ larga." }, { phrase: "morning", ipa: "/ˈmɔː.nɪŋ/", guide: "MOR-ning", tip: "/ɔː/ larga; r no audible." }, { phrase: "afternoon", ipa: "/ˌɑːf.təˈnuːn/", guide: "aaf-tuh-NUUN", tip: "Acento final; /uː/ larga." }, { phrase: "night", ipa: "/naɪt/", guide: "NAIT", tip: "Diptongo /aɪ/ y /t/ final." }, { phrase: "I wake up in the morning.", ipa: "/aɪ weɪk ʌp ɪn ðə ˈmɔː.nɪŋ/", guide: "ai UEIK ap in dha MOR-ning", tip: "Practica los enlaces wake up e in the." }, { phrase: "I eat breakfast.", ipa: "/aɪ iːt ˈbrek.fəst/", guide: "ai IIT BREK-fuhst", tip: "/iː/ larga en eat." }, { phrase: "I go to school.", ipa: "/aɪ ɡəʊ tə skuːl/", guide: "ai GOU tuh SKUUL", tip: "Diptongo /əʊ/ en go y /uː/ en school." }]
};

export default function BritishSpeakingPractice({ mission = "001" }: { mission?: string }) {
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const items = missionItems[mission] || missionItems["001"];
  const current = items[index];

  const playModel = () => {
    const utterance = new SpeechSynthesisUtterance(current.phrase.replace("…", ""));
    utterance.lang = "en-GB";
    utterance.rate = 0.82;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    setError("");
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const mediaRecorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      mediaRecorder.ondataavailable = event => { if (event.data.size) chunks.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audio = new Blob(chunks.current, { type: mediaRecorder.mimeType || "audio/webm" });
        const form = new FormData();
        form.append("audio", audio, "mission-speaking.webm");
        form.append("targetPhrase", current.phrase.replace("…", ""));
        form.append("language", "en");
        form.append("phraseId", "pre-a1-" + mission + "-speaking-" + index);
        try {
          setBusy(true);
          const response = await fetch("/api/pronunciation/analyze", { method: "POST", body: form });
          const data = (await response.json()) as AnalyzeResponse;
          if (!response.ok) throw new Error(data.diagnosticStage ? `${data.error || "No se ha podido analizar el audio."} (fase: ${data.diagnosticStage})` : data.error || "No se ha podido analizar el audio.");
          setResult(data);
        } catch (cause) {
          setError(cause instanceof Error ? cause.message : "Error al analizar la grabación.");
        } finally {
          setBusy(false);
        }
      };
      recorder.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch {
      setError("No se ha podido acceder al micrófono. Comprueba los permisos del navegador.");
    }
  };

  const stopRecording = () => {
    if (recorder.current?.state === "recording") {
      recorder.current.stop();
      setRecording(false);
    }
  };

  const next = () => {
    setIndex(value => (value + 1) % items.length);
    setResult(null);
    setError("");
  };

  return <section aria-labelledby="mission-speaking-title" className="mt-8 rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm sm:p-8">
    <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-800">Speaking · British English</p>
    <h2 id="mission-speaking-title" className="mt-2 text-2xl font-black text-slate-950">Ahora habla tú</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Practica el vocabulario y las frases de esta misión. Escucha el modelo, fíjate en los sonidos y graba tu voz para comprobar qué palabras reconoce el sistema.</p>
    <div className="mt-6 rounded-2xl border border-cyan-100 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Elemento {index + 1} de {items.length}</p>
      <h3 className="mt-2 text-3xl font-black text-slate-950">{current.phrase}</h3>
      <p className="mt-2 font-mono text-lg text-blue-700">{current.ipa}</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Aproximación: {current.guide}</p>
      <div className="mt-4 rounded-xl bg-blue-50 p-4">
        <p className="text-xs font-black uppercase tracking-wider text-blue-800">Consejo de pronunciación</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{current.tip}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={playModel} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700">🔊 Escuchar modelo en-GB</button>
        <button type="button" onClick={next} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Siguiente elemento →</button>
      </div>
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button type="button" disabled={busy} onClick={recording ? stopRecording : startRecording} className={`rounded-full px-6 py-3 font-bold text-white disabled:opacity-50 ${recording ? "bg-red-600" : "bg-slate-950"}`}>{recording ? "■ Detener grabación" : "🎙 Grabar mi pronunciación"}</button>
      <span className="text-sm text-slate-500">{recording ? "Grabando…" : busy ? "Analizando con Workers AI…" : "Necesitas permitir el acceso al micrófono."}</span>
    </div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {result && <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold text-slate-900">Resultado del reconocimiento</h3>
      <p className="mt-2 text-sm text-slate-600">El sistema ha reconocido: <strong>{result.transcription || "No se ha detectado voz"}</strong></p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{result.feedback}</p>
      <p className="mt-3 text-xs leading-5 text-amber-800">Importante: Whisper comprueba qué palabras reconoce, pero esta puntuación no mide todavía la precisión acústica de cada fonema.</p>
    </div>}
  </section>;
}
