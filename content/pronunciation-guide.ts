import britishIpa from "@/content/dictionaries/en-GB-ipa.json";

export function getSpanishPronunciationGuide(word: string): string {
  // Preview vocabulary sometimes pairs two terms (e.g. “Spain / Spanish”).
  // Resolve each term independently so both receive their own guide.
  const pairedTerms = word.split(/\s*\/\s*/).map((term) => term.trim()).filter(Boolean);
  if (pairedTerms.length > 1) {
    return pairedTerms.map(getSpanishPronunciationGuide).filter(Boolean).join(" / ");
  }
  const normalized = word.trim().toLowerCase().replace(/’/g, "'").replace(/[?…]/g, "").replace(/\s+/g, " ");
  const ipa = (britishIpa as Record<string, string>)[normalized];
  if (!ipa) {
    // Spanish-friendly approximations for A1 words missing from the British IPA dictionary.
    const a1Guides: Record<string, string> = {"spain":"spéin","spanish":"spá-nish","the united kingdom":"de iu-nái-tid kím-dam","british":"brí-tish","france":"fráns","french":"frénch","germany":"yér-ma-ni","german":"yér-man","italy":"í-ta-li","italian":"i-tá-li-an","country":"kán-tri","nationality":"na-sha-ná-li-ti","language":"láng-güich","letter":"lé-ta","alphabet":"ál-fa-bet","spell":"spél","first name":"férst néim","surname":"sér-neim","capital letter":"ká-pi-tal lé-ta","small letter":"smól lé-ta","double":"dá-bal","vowel":"váu-el","how do you spell…?":"jáu du iu spél","who":"jú","what":"uót","where":"uér","when":"uén","how":"jáu","how old":"jáu óuld","married":"má-rid","single":"sín-gal","address":"a-drés","occupation":"o-kiu-péi-shan","zero":"zí-rou","ten":"tén","twenty":"tuén-ti","thirty":"zér-ti","forty":"fór-ti","fifty":"fíf-ti","sixty":"sík-sti","seventy":"sé-ven-ti","eighty":"éi-ti","ninety":"náin-ti","english":"íng-glish","speak":"spík","read":"ríd","write":"ráit","understand":"an-der-stánd","practise":"prák-tis","profile":"próu-fáil","born":"bórn","live":"liv","work":"uérk","study":"stá-di","favourite":"féi-vrit","hobby":"jó-bi","free time":"frí táim","profile picture":"próu-fáil pík-cha","classmate":"klás-meit","teacher":"tí-cha","student":"stiú-dent","friend":"frénd","boy":"bói","girl":"gérl","man":"mán","woman":"ú-man","people":"pí-pal","group":"grúp","conversation":"kon-va-séi-shan","question":"kués-chan","answer":"án-sa","introduce":"in-tra-diús","again":"a-guén","slowly":"slóu-li","together":"ta-gué-da","class":"klás","new":"niú","welcome":"uél-kam","daily routine":"déi-li ru-tín","wake up":"uéik ap","get up":"guet ap","have breakfast":"jav brék-fast","start":"stárt","finish":"fí-nish","usually":"iú-zhu-a-li","sometimes":"sám-taimz","always":"ól-ueiz","at night":"at náit","house":"jáus","flat":"flát","kitchen":"kí-chen","bedroom":"béd-rum","bathroom":"báz-rum","living room":"lí-ving rum","garden":"gár-den","sofa":"sóu-fa","table":"téi-bal","next to":"nékst tu","bread":"bréd","rice":"ráis","pasta":"pás-ta","apple":"á-pal","banana":"ba-ná-na","water":"uó-ta","milk":"míl(k)","coffee":"kó-fi","chicken":"chí-ken","vegetables":"védch-ta-balz","menu":"mén-iu","order":"ór-da","i'd like":"áid láik","cup":"káp","glass":"glás","bottle":"bó-tal","sandwich":"sán-uich","soup":"súp","bill":"bíl","please":"plíz","how do you spell":"jáu du iu spél","football":"fút-bol","tennis":"té-nis","basketball":"bás-ket-bol","swimming":"suí-ming","cycling":"sái-kling","run":"ran","jump":"dyamp","play":"pléi","can":"kan","can't":"kant","sports equipment":"sports i-kuíp-ment","training":"tréi-ning","shirt":"shért","t-shirt":"tí-shért","trousers":"tráu-zers","jeans":"dyíns","dress":"drés","skirt":"skért","shoes":"shúz","jacket":"dyá-ket","coat":"kóut","trainers":"tréi-ners","blue":"blú","black":"blák","red":"réd","white":"uáit","size":"sáiz","wear":"uér","music":"miú-zik","reading":"rí-ding","dancing":"dán-sing","cooking":"kú-king","watching tv":"uó-ching tí-ví","playing games":"pléi-ing guéims","listening to music":"lí-se-ning tu miú-zik","taking photos":"téi-king fóu-tous","meeting friends":"mí-ting frénds","town":"táun","city":"sí-ti","street":"strít","square":"skuér","park":"párk","station":"stéi-shan","bus stop":"bás stop","supermarket":"sú-per-már-ket","bank":"bánk","post office":"póust ó-fis","hospital":"jós-pi-tal","turn left":"tern léft","turn right":"tern ráit","go straight":"góu stréit","opposite":"ó-po-zit","bus":"bás","train":"tréin","underground":"án-der-graund","taxi":"ták-si","car":"kár","bicycle":"bái-si-kal","plane":"pléin","ticket":"tí-ket","single ticket":"sín-gal tí-ket","return ticket":"ri-térn tí-ket","platform":"plát-form","timetable":"táim-téi-bal","journey":"dyér-ni","travel":"trá-vel","leave":"lív","arrive":"a-ráiv","hotel":"jou-tél","reception":"ri-sép-shan","room":"rúm","single room":"sín-gal rúm","double room":"dá-bal rúm","reservation":"re-zer-véi-shan","key":"kí","lift":"líft","breakfast":"brék-fast","shower":"sháu-er","towel":"táu-el","night":"náit","check in":"chék in","check out":"chék áut","available":"a-véi-la-bal","airport":"ér-port","check-in desk":"chék-in desk","boarding pass":"bór-ding pas","passport":"pás-port","luggage":"lá-gidch","suitcase":"sút-keis","hand luggage":"jánd lá-gidch","security":"si-kiú-ri-ti","departure":"di-pár-cher","arrival":"a-rái-val","flight":"fláit","gate":"guéit","boarding":"bór-ding","delayed":"di-léid","on time":"on táim","baggage claim":"bá-gidch kléim","passport control":"pás-port kon-tróul","terminal":"tér-mi-nal","weather":"ué-der","sunny":"sá-ni","cloudy":"kláu-di","rainy":"réi-ni","windy":"uín-di","snowy":"snóu-i","hot":"jót","cold":"kóuld","warm":"uórm","cool":"kúl","spring":"spring","summer":"sá-mer","autumn":"ó-tam","winter":"uín-ter","temperature":"tém-pre-cher","forecast":"fór-kast","rain":"réin","snow":"snóu","doctor":"dók-ter","nurse":"ners","patient":"péi-shent","appointment":"a-póint-ment","head":"jéd","stomach":"stá-mak","throat":"zróut","tooth":"túz","back":"bák","arm":"árm","leg":"lég","hand":"jánd","foot":"fút","shoulder":"shóul-der","headache":"jé-deik","stomachache":"stá-mak-eik","sore throat":"sór zróut","toothache":"túz-eik","feel":"fíl","ill":"íl","better":"bé-ter","medicine":"mé-di-sin","between":"bi-tuín","near":"nír","ride a bicycle":"ráid e bái-si-kal","tall":"tól","short":"shórt","medium height":"mí-di-am jáit","young":"yáng","old":"óuld","long hair":"lóng jér","short hair":"shórt jér","curly hair":"kér-li jér","straight hair":"stréit jér","blonde hair":"blónd jér","brown hair":"bráun jér","black hair":"blák jér","blue eyes":"blú áiz","brown eyes":"bráun áiz","glasses":"glá-siz","beard":"bírd","moustache":"mas-tásh","look like":"lúk láik","describe":"dis-kráib","family":"fá-mi-li","mother":"má-der","father":"fá-der","parents":"pé-rents","sister":"sís-ter","brother":"brá-der","sibling":"síb-ling","grandmother":"gránd-má-der","grandfather":"gránd-fá-der","grandparents":"gránd-pé-rents","aunt":"ánt","uncle":"án-kal","cousin":"ká-zan","daughter":"dó-ter","son":"sán","children":"chíl-dren","husband":"jás-band","wife":"uáif","partner":"párt-ner","family tree":"fá-mi-li trí","my":"mái","your":"yór","his":"jiz","her":"jer","our":"áuer","their":"dér","birthday":"bérz-dei","celebration":"se-le-bréi-shan","party":"pár-ti","invitation":"in-vi-téi-shan","guest":"guést","present":"pré-zent","cake":"kéik","card":"kárd","candles":"kán-dals","balloon":"ba-lún","january":"dyán-iu-a-ri","february":"fé-bru-a-ri","march":"márch","april":"éi-pril","may":"méi","june":"dyún","july":"dyu-lái","august":"ó-gast","september":"sep-tém-ber","october":"ok-tóu-ber","november":"nou-vém-ber","december":"di-sém-ber","date":"déit","birthday card":"bérz-dei kárd","first":"férst","second":"sé-kand","third":"zérd","fifth":"fífth","would you like to":"uúd iu láik tu","come":"kám","library":"lái-bre-ri","librarian":"lai-bré-ri-an","book":"buk","library card":"lái-bre-ri kárd","borrow":"bó-rou","return":"ri-térn","bookcase":"búk-keis","shelf":"shélf","floor":"flór","opening hours":"óu-pe-ning áu-ers","close":"klóuz","open":"óu-pen","story":"stó-ri","adventure":"ad-vén-cher","animal":"á-ni-mal","quiet":"kuái-et","three books":"zrí buks","two weeks":"tú uíks","How long can I borrow this":"jáu long kan ai bó-rou dis","Where can I find":"uér kan ai fáind","What time does the library close":"uót táim daz de lái-bre-ri klóuz","I must return this book":"ai mast ri-térn dis buk","shop":"shóp","shop assistant":"shóp a-sís-tant","customer":"kás-ta-mer","price":"práis","pound":"páund","pence":"pens","cash":"kash","receipt":"ri-sít","bag":"bag","small":"smól","medium":"mí-di-am","large":"lárch","cheap":"chíip","expensive":"ik-spén-siv","buy":"bái","pay":"péi","change":"chéinch","How much is it":"jáu mach iz it","How much are they":"jáu mach ar déi","Here you are":"jía iu ar","That's all, thank you":"dats ól, zánk iu"};
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
