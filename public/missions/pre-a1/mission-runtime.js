(function(){
"use strict";
var M=window.LINGUAFLY_MISSION,root=document.getElementById("mission-root");if(!M||!root)return;
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function norm(v){return String(v).toLowerCase().trim().replace(/[.!?]+$/,"").replace(/\s+/g," ");}
function shuffle(a){return a.slice().sort(function(){return Math.random()-.5;});}
var soundHints={
  "run": "ran",
  "jump": "yamp",
  "climb": "kláim",
  "swing": "suíng",
  "slide": "sláid",
  "play": "pléi",
  "stop": "stop",
  "circle": "sérkol",
  "square": "skuéa",
  "triangle": "tráiángol",
  "rectangle": "réktángol",
  "star": "stáa",
  "heart": "jaat",
  "big": "big",
  "small": "smól",
  "long": "long",
  "short": "shórt",
  "tall": "tól",
  "little": "lítol",
  "book": "buk",
  "pencil": "pénsol",
  "pen": "pen",
  "ruler": "rúula",
  "rubber": "rába",
  "bag": "bag",
  "notebook": "nóutbuk",
  "crayons": "kréi-onz",
  "teacher": "tíicha",
  "student": "stiúdent",
  "desk": "desk",
  "board": "bóod",
  "door": "dóo",
  "window": "uíndou",
  "chair": "chéa",
  "monday–sunday": "mándei-sándei",
  "today": "tudéi",
  "tomorrow": "tamórou",
  "monday": "mándei",
  "tuesday": "tiúsdei",
  "wednesday": "uénsdei",
  "thursday": "zérsdei",
  "friday": "fráidei",
  "saturday": "sátadei",
  "sunday": "sándei",
  "sunny": "sáni",
  "rainy": "réini",
  "cloudy": "kláudi",
  "windy": "uíndi",
  "snowy": "snóui",
  "hot": "jot",
  "cold": "kóuld",
  "spring": "spring",
  "summer": "sáma",
  "autumn": "ótem",
  "winter": "uínta",
  "flower": "fláua",
  "leaf": "líif",
  "snow": "snóu",
  "apple": "ápol",
  "pear": "péa",
  "orange": "órinch",
  "grape": "gréip",
  "strawberry": "stróberi",
  "melon": "mélon",
  "banana": "banána",
  "like": "láik",
  "carrot": "káret",
  "tomato": "tamáatou",
  "potato": "patéitou",
  "lettuce": "létis",
  "onion": "áñon",
  "peas": "píiz",
  "cucumber": "kiúkam-ba"
};
var all=M.words.concat(M.extraVocabulary||[]);
var css='.lf-shell{max-width:1060px;margin:auto;padding:22px 16px 42px;color:#20345d;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.lf-hero{padding:25px;border-radius:25px;background:linear-gradient(135deg,#20366f,#5146a3);color:#fff}.lf-kicker{font-size:12px;font-weight:900;letter-spacing:.14em;color:#a8efff}.lf-hero h1{font-size:clamp(29px,5vw,43px);margin:9px 0}.lf-lead{color:#e3eaff;line-height:1.65}.lf-pills,.lf-tabs,.lf-week,.lf-audio-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}.lf-pill{padding:6px 11px;border-radius:99px;background:#ffffff20;font-size:12px;font-weight:800}.lf-tabs button,.lf-btn{border:1px solid #d8e2fa;border-radius:13px;padding:10px 13px;background:#fff;color:#294777;font-weight:850;cursor:pointer}.lf-tabs button.active,.lf-btn.primary{background:linear-gradient(135deg,#3156a4,#5946a7);color:#fff;border-color:transparent}.lf-panel{display:none;background:#fff;border:1px solid #dbe4ff;border-radius:23px;padding:22px;margin-top:12px}.lf-panel.active{display:block}.lf-panel h2{font-size:25px;color:#243e75;margin:3px 0 8px}.lf-muted{color:#65799c;line-height:1.65}.lf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:11px;margin-top:18px}.lf-word{border:1px solid #dce6f7;border-radius:17px;background:linear-gradient(145deg,#f0f6ff,#fff);padding:14px;text-align:center}.lf-emoji{font-size:35px}.lf-word h3{font-size:17px;margin:8px 0 3px;color:#243e75}.lf-translation{color:#8a512a;font-weight:700;margin-bottom:10px}.lf-rule,.lf-passage,.lf-audio-card{background:#f1f6ff;border:1px solid #dce6f7;border-radius:17px;padding:17px;margin:15px 0;color:#294777;line-height:1.8}.lf-quiz{border-top:1px solid #e1e8f7;margin-top:18px;padding-top:16px}.lf-progress{height:9px;background:#e9eff9;border-radius:20px;overflow:hidden;margin:10px 0}.lf-bar{height:100%;background:linear-gradient(90deg,#35c4c0,#7560d9,#f18bb3)}.lf-question{font-size:20px;line-height:1.45;font-weight:850;color:#273f76;margin:15px 0}.lf-options{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:9px}.lf-option{border:2px solid #e0e7fa;border-radius:13px;background:#f7f9ff;color:#203653;padding:12px;font-weight:750;text-align:left;cursor:pointer}.lf-option:disabled{opacity:.82}.lf-feedback{min-height:26px;font-weight:800;margin:13px 0}.lf-success{color:#21845b}.lf-error{color:#a34b42}.lf-taskmeta{font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:#087e91}.lf-input{width:100%;max-width:420px;padding:12px 14px;border:1px solid #cbd7ee;border-radius:12px;font:inherit;margin:8px 0}.lf-pron{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:13px;border:1px solid #dce6f7;border-radius:15px}.lf-pron b{display:block;color:#243e75;font-size:17px}.lf-pron small{display:block;color:#087c9a;margin-top:4px;font-weight:750}.lf-sound{display:block;color:#087c9a;font-size:14px;font-weight:900;margin-top:5px}.lf-pron-note{font-size:13px;color:#65799c;margin:6px 0 12px}.lf-summary{border-radius:15px;background:#e9fff4;color:#176b50;padding:16px;font-weight:800;margin-top:12px}.lf-day{background:#eef4ff;border-radius:11px;padding:8px 11px;font-size:13px;font-weight:800}.lf-transcript{margin-top:17px;padding:15px;background:#fff4e8;border-radius:14px;color:#80512e;line-height:1.7}.lf-badge{display:inline-block;border-radius:99px;background:#e1f8fa;color:#087e91;padding:5px 9px;font-size:11px;font-weight:900}.lf-empty{padding:18px;border:1px dashed #c7d4ee;border-radius:14px;color:#6b7b9b}@media(max-width:640px){.lf-shell{padding:12px 9px 28px}.lf-hero{padding:18px}.lf-tabs button{font-size:12px;padding:9px}.lf-panel{padding:15px}.lf-panel h2{font-size:22px}}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var tabs=["explore","practice","grammar","pronunciation","reading","listening","dictionary"],labels=["1. Exploración","2. Práctica · 20 retos","3. Gramática","4. Pronunciación","5. Reading","6. Listening","7. Diccionario"];
var h='<main class="lf-shell"><header class="lf-hero"><div class="lf-kicker">LINGUAFLY · PRE-A1 · MISIÓN '+esc(M.id)+'</div><h1>'+esc(M.title)+'</h1><p class="lf-lead">'+esc(M.description)+'</p><div class="lf-pills"><span class="lf-pill">'+esc(M.theme)+'</span><span class="lf-pill">20 retos variados</span><span class="lf-pill">Reading + Listening</span></div></header><nav class="lf-tabs">';
tabs.forEach(function(t,i){h+='<button data-tab="'+t+'" class="'+(i===0?"active":"")+'">'+labels[i]+'</button>';});
h+='</nav><section id="explore" class="lf-panel active"><h2>Descubre el vocabulario</h2><p class="lf-muted">Observa cada imagen, escucha la palabra en inglés y lee su significado en castellano. Guarda las palabras que quieras repasar.</p><div id="lf-vocab" class="lf-grid"></div><div id="lf-extra"></div><p class="lf-muted">Audio de referencia: voz sintética del navegador configurada en inglés británico (en-GB).</p><button id="lf-save-all" class="lf-btn primary">Añadir todas las palabras al Diccionario Ancestral</button></section>';
h+='<section id="practice" class="lf-panel"><h2>Práctica · 20 retos variados</h2><p class="lf-muted">Alterna traducción, escucha, escritura, reconocimiento visual y frases modelo. Las instrucciones están en castellano.</p><div id="lf-practice" class="lf-quiz"></div></section>';
h+='<section id="grammar" class="lf-panel"><h2>Gramática · Grammar</h2><div class="lf-rule"><p><strong>Foco:</strong> '+esc(M.grammar.focus)+'</p><p><strong>Modelo:</strong> '+esc(M.grammar.model)+'</p><p><strong>Práctica guiada:</strong> '+esc(M.grammar.practice)+'</p></div><p class="lf-muted">Completa las frases siguiendo el patrón de esta misión.</p><div id="lf-grammar-quiz" class="lf-quiz"></div></section>';
h+='<section id="pronunciation" class="lf-panel"><h2>Pronunciation · Pronunciación</h2><p class="lf-muted">Escucha cada palabra con voz inglesa (en-GB), practica la indicación y repite tres veces.</p><div id="lf-pron" class="lf-grid"></div><p class="lf-muted">La voz es sintética del navegador; no es una grabación de estudio.</p></section>';
h+='<section id="reading" class="lf-panel"><h2>Reading · Comprensión lectora</h2><p class="lf-muted">Lee el texto y responde a las diez preguntas.</p><article class="lf-passage">'+esc(M.readingText)+'</article><div id="lf-reading-quiz" class="lf-quiz"></div></section>';
h+='<section id="listening" class="lf-panel"><h2>Listening · Comprensión auditiva</h2><p class="lf-muted">Formato del audio: <strong>'+esc(M.listeningFormat)+'</strong>. Escucha el guion y responde a las diez preguntas. Puedes reproducirlo otra vez.</p><div class="lf-audio-card"><div class="lf-audio-row"><button id="lf-play" class="lf-btn primary">▶ Escuchar el audio</button><button id="lf-stop" class="lf-btn">■ Detener</button></div><p class="lf-muted">El guion se lee con la voz en-GB disponible en tu navegador.</p></div><div id="lf-listening-quiz" class="lf-quiz"></div><details id="lf-transcript" class="lf-transcript" hidden><summary>Ver transcripción (después de responder)</summary><p>'+esc(M.listeningScript)+'</p></details></section>';
h+='<section id="dictionary" class="lf-panel"><h2>Diccionario Ancestral</h2><p class="lf-muted">Aquí aparecen las palabras que guardas durante la exploración. Se conservan en este navegador para repasarlas.</p><div id="lf-saved"></div></section></main>';root.innerHTML=h;
function speak(text,reps){if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window))return;window.speechSynthesis.cancel();var left=reps||1;function play(){if(left<=0)return;left--;var u=new SpeechSynthesisUtterance(String(text));u.lang="en-GB";u.rate=.86;u.onend=function(){if(left>0)play();};window.speechSynthesis.speak(u);}play();}
document.querySelectorAll(".lf-tabs [data-tab]").forEach(function(b){b.addEventListener("click",function(){document.querySelectorAll(".lf-tabs button").forEach(function(x){x.classList.toggle("active",x===b);});document.querySelectorAll(".lf-panel").forEach(function(x){x.classList.toggle("active",x.id===b.dataset.tab);});if(b.dataset.tab==="dictionary")renderDictionary();});});
var key="linguafly-diccionario-ancestral-pre-a1";
function getSaved(){try{return JSON.parse(localStorage.getItem(key)||"[]");}catch(e){return [];}}
function save(w){var a=getSaved();if(!a.some(function(x){return x.en===w.en;})){a.push({en:w.en,es:w.es,emoji:w.emoji,mission:M.id});localStorage.setItem(key,JSON.stringify(a));}renderDictionary();}
function renderDictionary(){var t=document.getElementById("lf-saved"),a=getSaved();if(!a.length){t.innerHTML='<div class="lf-empty">Todavía no has guardado palabras. Vuelve a Exploración para añadir vocabulario.</div>';return;}t.innerHTML='<div class="lf-grid">'+a.map(function(w,i){return '<div class="lf-word"><div class="lf-emoji">'+esc(w.emoji)+'</div><h3>'+esc(w.en)+'</h3><div class="lf-translation">'+esc(w.es)+'</div><span class="lf-badge">Misión '+esc(w.mission)+'</span><button class="lf-btn" data-saved="'+i+'">🔊 Escuchar</button></div>';}).join("")+'</div>';t.querySelectorAll("[data-saved]").forEach(function(b){b.addEventListener("click",function(){speak(a[Number(b.dataset.saved)].en,1);});});}
function renderWords(){document.getElementById("lf-vocab").innerHTML=M.words.map(function(w,i){return '<article class="lf-word"><div class="lf-emoji">'+esc(w[2])+'</div><h3>'+esc(w[0])+'</h3><div class="lf-translation">'+esc(w[1])+'</div><button class="lf-btn" data-speak="'+i+'">🔊 Escuchar</button><button class="lf-btn" data-save="'+i+'">＋ Diccionario</button></article>';}).join("");document.querySelectorAll("[data-speak]").forEach(function(b){b.addEventListener("click",function(){speak(M.words[Number(b.dataset.speak)][0],1);});});document.querySelectorAll("[data-save]").forEach(function(b){b.addEventListener("click",function(){var w=M.words[Number(b.dataset.save)];save({en:w[0],es:w[1],emoji:w[2]});});});if(M.extraVocabulary&&M.extraVocabulary.length){document.getElementById("lf-extra").innerHTML='<p class="lf-muted"><strong>Los siete días de la semana:</strong></p><div class="lf-grid">'+M.extraVocabulary.map(function(w){return '<article class="lf-word"><div class="lf-emoji">'+esc(w[2])+'</div><h3>'+esc(w[0])+'</h3><div class="lf-translation">'+esc(w[1])+'</div><button class="lf-btn" data-extra="'+esc(w[0])+'">🔊 Escuchar</button></article>';}).join("")+'</div>';document.querySelectorAll("[data-extra]").forEach(function(b){b.addEventListener("click",function(){speak(b.dataset.extra,1);});});}}
document.getElementById("lf-save-all").addEventListener("click",function(){all.forEach(function(w){save({en:w[0],es:w[1],emoji:w[2]});});this.textContent="✓ Vocabulario guardado";});
function renderPron(){document.getElementById("lf-pron").insertAdjacentHTML("beforebegin",'<p class="lf-pron-note">La forma «Suena como» es una aproximación para leer la pronunciación inglesa con referencias del español; no es una transcripción AFI/IPA.</p>');document.getElementById("lf-pron").innerHTML=M.pronunciation.map(function(p,i){var cue=soundHints[String(p.word).toLowerCase()]||"Consulta el audio";return '<article class="lf-pron"><div><b>'+esc(p.word)+'</b><span class="lf-sound">Suena como: '+esc(cue)+'</span><small>'+esc(p.activity)+'</small><small>Audio modelo en inglés británico; escuchar y repetir 3 veces.</small></div><button class="lf-btn" data-pron="'+i+'">🔊 Repetir 3 veces</button></article>';}).join("");document.querySelectorAll("[data-pron]").forEach(function(b){b.addEventListener("click",function(){speak(M.pronunciation[Number(b.dataset.pron)].word,3);});});}
function makeTasks(){var types=["meaning","listen","spell","picture","meaning","listen","spell","grammar","picture","meaning","listen","spell","grammar","meaning","listen","picture","spell","grammar","order","final"],tasks=[];types.forEach(function(type,i){var w=all[i%all.length],others=all.filter(function(x){return x[0]!==w[0]&&x[1]!==w[1];}),pool=shuffle([w].concat(others.slice(0,2)));if(type==="meaning")tasks.push({type:type,w:w,prompt:'¿Qué significa "'+w[0]+'"?',answer:w[1],options:pool.map(function(x){return x[1];})});else if(type==="listen")tasks.push({type:type,w:w,prompt:"Escucha la palabra y elige su forma escrita.",answer:w[0],options:pool.map(function(x){return x[0];})});else if(type==="spell")tasks.push({type:type,w:w,prompt:"Completa la palabra: "+w[0].replace(/[A-Za-z]/g,function(c,j){return j%2===0?c:"_";}),answer:w[0],hint:"Significa "+w[1]+"."});else if(type==="picture")tasks.push({type:type,w:w,prompt:"¿Qué palabra corresponde a esta imagen?",answer:w[0],options:pool.map(function(x){return x[0];})});else if(type==="grammar"){var g=M.grammar.items[(i+Math.floor(i/7))%M.grammar.items.length];tasks.push({type:type,w:w,prompt:g.prompt,answer:g.answer,options:g.options,hint:g.es});}else if(type==="order")tasks.push({type:type,w:w,prompt:"Ordena las palabras para formar el modelo gramatical.",answer:M.grammar.order,tokens:shuffle(M.grammar.order.replace(/[.!?]/g,"").split(" "))});else tasks.push({type:type,w:w,prompt:"Reto final: elige el modelo correcto de esta misión.",answer:M.grammar.order,options:shuffle(M.grammar.final),hint:M.grammar.focus});});return tasks;}
var taskIndex=0,score=0,done=false,tasks=makeTasks(),host=document.getElementById("lf-practice");
function renderPractice(){if(taskIndex>=tasks.length){host.innerHTML='<div class="lf-summary">¡Has completado los 20 retos! Aciertos: '+score+' de 20.</div><button id="lf-restart" class="lf-btn primary">Repetir los 20 retos</button>';document.getElementById("lf-restart").addEventListener("click",function(){taskIndex=0;score=0;tasks=makeTasks();renderPractice();});return;}var t=tasks[taskIndex];done=false;var labels={meaning:"Traducción",listen:"Escucha y elige",spell:"Completa la palabra",picture:"Reconocimiento visual",grammar:"Gramática guiada",order:"Ordena la frase",final:"Reto final"},extra="";if(t.type==="listen")extra='<button id="lf-task-audio" class="lf-btn">🔊 Escuchar</button>';if(t.type==="picture")extra='<div class="lf-emoji" style="font-size:58px;margin:12px 0">'+esc(t.w[2])+'</div>';if(t.type==="order")extra='<p class="lf-rule">'+esc(t.tokens.join(" · "))+'</p><input id="lf-input" class="lf-input" placeholder="Escribe la frase en el orden correcto">';if(t.type==="spell")extra='<p class="lf-muted">'+esc(t.hint)+'</p><input id="lf-input" class="lf-input" placeholder="Escribe la palabra">';var options=t.options?'<div class="lf-options">'+t.options.map(function(o){return '<button class="lf-option" data-answer="'+esc(o)+'">'+esc(o)+'</button>';}).join("")+'</div>':"";host.innerHTML='<div class="lf-taskmeta">Reto '+(taskIndex+1)+' de 20 · '+labels[t.type]+'</div><div class="lf-progress"><div class="lf-bar" style="width:'+(taskIndex/20*100)+'%"></div></div><h3 class="lf-question">'+esc(t.prompt)+'</h3>'+extra+options+'<p id="lf-task-feedback" class="lf-feedback"></p><button id="lf-next" class="lf-btn primary" hidden>Siguiente reto →</button>';if(t.type==="listen")document.getElementById("lf-task-audio").addEventListener("click",function(){speak(t.w[0],1);});function submit(v){if(done)return;done=true;var ok=norm(v)===norm(t.answer);if(ok)score++;var fb=document.getElementById("lf-task-feedback");fb.textContent=ok?"✓ ¡Correcto!":"Respuesta correcta: "+t.answer+(t.hint?" · "+t.hint:"");fb.className="lf-feedback "+(ok?"lf-success":"lf-error");host.querySelectorAll(".lf-option").forEach(function(b){b.disabled=true;if(norm(b.dataset.answer)===norm(t.answer))b.style.borderColor="#21845b";});document.getElementById("lf-next").hidden=false;}host.querySelectorAll(".lf-option").forEach(function(b){b.addEventListener("click",function(){submit(b.dataset.answer);});});var input=document.getElementById("lf-input");if(input){input.addEventListener("keydown",function(e){if(e.key==="Enter")submit(input.value);});var check=document.createElement("button");check.className="lf-btn";check.textContent="Comprobar";check.addEventListener("click",function(){submit(input.value);});input.insertAdjacentElement("afterend",check);}document.getElementById("lf-next").addEventListener("click",function(){taskIndex++;renderPractice();});}
function mountQuiz(id,items,label,finish){var el=document.getElementById(id),i=0,points=0,answered=false;function draw(){if(i>=items.length){el.innerHTML='<div class="lf-summary">Sección completada: '+points+' de '+items.length+' respuestas correctas.</div>';if(finish)finish();return;}var q=items[i];answered=false;el.innerHTML='<div class="lf-taskmeta">'+label+' · Pregunta '+(i+1)+' de '+items.length+'</div><div class="lf-progress"><div class="lf-bar" style="width:'+(i/items.length*100)+'%"></div></div><h3 class="lf-question">'+esc(q.question)+'</h3><div class="lf-options">'+shuffle(q.options).map(function(o){return '<button class="lf-option" data-answer="'+esc(o)+'">'+esc(o)+'</button>';}).join("")+'</div><p id="'+id+'-fb" class="lf-feedback"></p><button id="'+id+'-next" class="lf-btn primary" hidden>Siguiente →</button>';el.querySelectorAll(".lf-option").forEach(function(b){b.addEventListener("click",function(){if(answered)return;answered=true;var ok=norm(b.dataset.answer)===norm(q.answer);if(ok)points++;var f=document.getElementById(id+"-fb");f.textContent=ok?"✓ ¡Correcto!":"Respuesta correcta: "+q.answer;f.className="lf-feedback "+(ok?"lf-success":"lf-error");el.querySelectorAll(".lf-option").forEach(function(x){x.disabled=true;if(norm(x.dataset.answer)===norm(q.answer))x.style.borderColor="#21845b";});document.getElementById(id+"-next").hidden=false;});});document.getElementById(id+"-next").addEventListener("click",function(){i++;draw();});}draw();}
var grammar=M.grammar.items.map(function(g){return {question:g.prompt,answer:g.answer,options:g.options};});
var reading=M.answers.map(function(n,i){var w=M.words[n],opts=n<=2?M.words.slice(0,3):[w,M.words[0],M.words[1]];return {question:window.LF_READING_PROMPTS[i],answer:w[0],options:opts.map(function(x){return x[0];})};});
var listening=M.answers.map(function(n,i){var w=M.words[n],opts=n<=2?M.words.slice(0,3):[w,M.words[0],M.words[1]];return {question:window.LF_LISTENING_PROMPTS[i],answer:w[0],options:opts.map(function(x){return x[0];})};});
mountQuiz("lf-grammar-quiz",grammar,"Gramática");mountQuiz("lf-reading-quiz",reading,"Reading");mountQuiz("lf-listening-quiz",listening,"Listening",function(){document.getElementById("lf-transcript").hidden=false;});
document.getElementById("lf-play").addEventListener("click",function(){speak(M.listeningScript,1);});document.getElementById("lf-stop").addEventListener("click",function(){if("speechSynthesis" in window)window.speechSynthesis.cancel();});
renderWords();renderPron();renderPractice();renderDictionary();
})();