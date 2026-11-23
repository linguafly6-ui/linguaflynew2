import britishIpa from "@/content/dictionaries/en-GB-ipa.json";

function getSpanishPronunciationGuide(word: string): string {
  // Preview vocabulary sometimes pairs two terms (e.g. “Spain / Spanish”).
  // Resolve each term independently so both receive their own guide.
  const pairedTerms = word.split(/\s*\/\s*/).map((term) => term.trim()).filter(Boolean);
  if (pairedTerms.length > 1) {
    return pairedTerms.map(getSpanishPronunciationGuide).filter(Boolean).join(" / ");
  }
  const normalized = word.toLowerCase().replace(/’/g, "'");
  const ipa = (britishIpa as Record<string, string>)[normalized];
  if (!ipa) {
    // Spanish-friendly approximations for A1 words missing from the British IPA dictionary.
    const a1Guides: Record<string, string> = {"spain":"spéin","spanish":"spá-nish","the united kingdom":"de iu-nái-tid kím-dam","british":"brí-tish","france":"fráns","french":"frénch","germany":"yér-ma-ni","german":"yér-man","italy":"í-ta-li","italian":"i-tá-li-an","country":"kán-tri","nationality":"na-sha-ná-li-ti","language":"láng-güich","letter":"lé-ta","alphabet":"ál-fa-bet","spell":"spél","first name":"férst néim","surname":"sér-neim","capital letter":"ká-pi-tal lé-ta","small letter":"smól lé-ta","double":"dá-bal","vowel":"váu-el","how do you spell…?":"jáu du iu spél","who":"jú","what":"uót","where":"uér","when":"uén","how":"jáu","how old":"jáu óuld","married":"má-rid","single":"sín-gal","address":"a-drés","occupation":"o-kiu-péi-shan","zero":"zí-rou","ten":"tén","twenty":"tuén-ti","thirty":"zér-ti","forty":"fór-ti","fifty":"fíf-ti","sixty":"sík-sti","seventy":"sé-ven-ti","eighty":"éi-ti","ninety":"náin-ti","english":"íng-glish","speak":"spík","read":"ríd","write":"ráit","understand":"an-der-stánd","practise":"prák-tis","profile":"próu-fáil","born":"bórn","live":"liv","work":"uérk","study":"stá-di","favourite":"féi-vrit","hobby":"jó-bi","free time":"frí táim","profile picture":"próu-fáil pík-cha","classmate":"klás-meit","teacher":"tí-cha","student":"stiú-dent","friend":"frénd","boy":"bói","girl":"gérl","man":"mán","woman":"ú-man","people":"pí-pal","group":"grúp","conversation":"kon-va-séi-shan","question":"kués-chan","answer":"án-sa","introduce":"in-tra-diús","again":"a-guén","slowly":"slóu-li","together":"ta-gué-da","class":"klás","new":"niú","welcome":"uél-kam","daily routine":"déi-li ru-tín","wake up":"uéik ap","get up":"guet ap","have breakfast":"jav brék-fast","start":"stárt","finish":"fí-nish","usually":"iú-zhu-a-li","sometimes":"sám-taimz","always":"ól-ueiz","at night":"at náit","house":"jáus","flat":"flát","kitchen":"kí-chen","bedroom":"béd-rum","bathroom":"báz-rum","living room":"lí-ving rum","garden":"gár-den","sofa":"sóu-fa","table":"téi-bal","next to":"nékst tu","bread":"bréd","rice":"ráis","pasta":"pás-ta","apple":"á-pal","banana":"ba-ná-na","water":"uó-ta","milk":"míl(k)","coffee":"kó-fi","chicken":"chí-ken","vegetables":"védch-ta-balz","menu":"mén-iu","order":"ór-da","i'd like":"áid láik","cup":"káp","glass":"glás","bottle":"bó-tal","sandwich":"sán-uich","soup":"súp","bill":"bíl","please":"plíz"};
    return a1Guides[normalized] ?? "";
  }

  // Convert British IPA into an accessible Spanish-friendly reading aid.
  // This is deliberately an approximation, not a second phonetic alphabet.
  let value = ipa.replace(/^\/+|\/+$/g, "").replace(/[ˈˌː]/g, "");
  // In Spanish-friendly spelling, /j/ after an initial consonant is read as
  // an "i" glide: future becomes fiu-cha rather than fyu-cha.
  value = value.replace(/([bcdfghjklmnñpqrstvwxyz])j(?=u)/g, "$1i");
  const rules: Array<[RegExp, string]> = [
    [/tʃ/g, "ch"], [/dʒ/g, "dy"], [/θ/g, "z"], [/ð/g, "d"],
    [/ʃ/g, "sh"], [/ʒ/g, "zh"], [/ŋ/g, "ng"], [/ɹ/g, "r"],
    [/j/g, "y"], [/h/g, "j"], [/eɪ/g, "ei"], [/aɪ/g, "ai"], [/aʊ/g, "au"], [/əʊ/g, "ou"], [/oʊ/g, "ou"], [/ɔɪ/g, "oi"], [/ɪə/g, "ia"], [/eə/g, "ea"], [/ʊə/g, "ua"], [/ɐ/g, "a"], [/ə/g, "e"],
    [/ʌ/g, "a"], [/æ/g, "a"], [/ɑ/g, "a"], [/ɒ/g, "o"],
    [/ɔ/g, "o"], [/ɛ/g, "e"], [/ɪ/g, "i"], [/i/g, "i"],
    [/ʊ/g, "u"], [/u/g, "u"], [/ɜː?/g, "er"],
    [/ɡ/g, "g"], [/r/g, "r"], [/w/g, "u"], [/v/g, "v"],
    [/ð/g, "d"], [/z/g, "z"], [/s/g, "s"], [/ʔ/g, ""]
  ];
  for (const [pattern, sound] of rules) value = value.replace(pattern, sound);
  value = value.replace(/[^a-zñ]/gi, "").replace(/([aeiou])\1+/g, "$1");
  value = value.replace(/^e/, "a").replace(/e$/, "a");

  // Add syllable breaks between vowel nuclei, keeping English digraphs intact.
  // Example: fiucha -> fiu-cha; jelou -> je-lou.
  const nuclei = [...value.matchAll(/[aeiou]+/g)];
  const breaks: number[] = [];
  for (let i = 0; i < nuclei.length - 1; i += 1) {
    const end = (nuclei[i].index ?? 0) + nuclei[i][0].length;
    const nextStart = nuclei[i + 1].index ?? end;
    const cluster = value.slice(end, nextStart);
    if (!cluster) continue;
    const digraphStart = cluster.search(/ch|sh|zh|ng/);
    const splitAt = digraphStart >= 0 ? end + digraphStart : cluster.length > 1 ? nextStart - 1 : end;
    breaks.push(splitAt);
  }
  for (const position of breaks.reverse()) {
    value = value.slice(0, position) + "-" + value.slice(position);
  }
  return value || "";
}
