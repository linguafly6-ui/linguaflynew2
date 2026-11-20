(function () {
  "use strict";
  const labels = {
    explore: "1. Exploración", practice: "2. Práctica", grammar: "3. Gramática",
    pronunciation: "4. Pronunciación", reading: "5. Reading", writing: "6. Writing",
    speaking: "7. Speaking", listening: "8. Listening"
  };
  const $ = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = String(text);
    return el;
  };
  function speak(value) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    const text = String(value || "").replace(/^tts:en-GB:/, "");
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  }
  function addQuiz(panel, items) {
    const host = $("div", "lf-curriculum-quiz");
    items.forEach((item) => {
      const card = $("article", "lf-curriculum-card");
      card.appendChild($("p", "lf-curriculum-prompt", item.prompt));
      const choices = $("div", "lf-curriculum-options");
      const feedback = $("p", "lf-curriculum-feedback", "");
      (item.options || []).forEach((option) => {
        const button = $("button", "lf-curriculum-option", option);
        button.type = "button";
        button.addEventListener("click", () => {
          const correct = String(option).trim().toLowerCase() === String(item.correctAnswer || "").trim().toLowerCase();
          feedback.textContent = correct ? "¡Correcto!" : "Inténtalo de nuevo. Escucha o revisa el ejemplo.";
          feedback.dataset.result = correct ? "correct" : "incorrect";
        });
        choices.appendChild(button);
      });
      card.append(choices, feedback);
      host.appendChild(card);
    });
    panel.appendChild(host);
  }
  function sectionPanel(id, title, subtitle) {
    const panel = $("section", "panel");
    panel.id = id;
    panel.appendChild($("h2", "", title));
    if (subtitle) panel.appendChild($("p", "section-subtitle", subtitle));
    return panel;
  }
  function renderGrammar(mission) {
    const data = mission.sections.find(s => s.sectionKey === "grammar");
    const panel = sectionPanel("grammar", "Gramática · Grammar", data.exercise.theory.explanation);
    const theory = $("div", "lf-curriculum-theory");
    theory.appendChild($("h3", "", data.exercise.theory.title));
    (data.exercise.theory.patterns || []).forEach((p) => {
      theory.appendChild($("p", "", p.label + ": " + p.pattern));
      (p.examples || []).forEach(ex => theory.appendChild($("p", "lf-curriculum-example", ex)));
    });
    theory.appendChild($("p", "lf-curriculum-tip", "Consejo: " + data.exercise.theory.tip));
    panel.appendChild(theory);
    addQuiz(panel, data.exercise.items);
    return panel;
  }
  function renderPronunciation(mission) {
    const data = mission.sections.find(s => s.sectionKey === "pronunciation");
    const panel = sectionPanel("pronunciation", "Pronunciación · British English", data.exercise.focus || "Escucha y repite las palabras de la misión.");
    const grid = $("div", "lf-curriculum-grid");
    data.exercise.items.forEach(item => {
      const card = $("article", "lf-curriculum-card");
      card.appendChild($("h3", "", item.word));
      card.appendChild($("p", "lf-curriculum-muted", item.translation));
      card.appendChild($("p", "lf-curriculum-tip", item.pronunciationGuide));
      const button = $("button", "secondary", "🔊 Escuchar");
      button.type = "button";
      button.addEventListener("click", () => speak(item.audio || item.word));
      card.appendChild(button);
      grid.appendChild(card);
    });
    panel.appendChild(grid);
    return panel;
  }
  function renderReading(mission) {
    const data = mission.sections.find(s => s.sectionKey === "reading");
    const panel = sectionPanel("reading", "Reading · Comprensión lectora", "Lee el texto y responde a las preguntas.");
    panel.appendChild($("article", "lf-curriculum-passage", data.exercise.content.passage));
    addQuiz(panel, data.exercise.items);
    return panel;
  }
  function renderWriting(mission) {
    const data = mission.sections.find(s => s.sectionKey === "writing");
    const panel = sectionPanel("writing", "Writing · Expresión escrita", data.exercise.writingTask || "Escucha y escribe las frases. Después redacta tu propio texto.");
    const prompt = $("div", "lf-curriculum-theory");
    prompt.appendChild($("p", "", "Dictado: escucha cada frase y escríbela."));
    data.exercise.items.forEach(item => {
      const row = $("div", "lf-curriculum-card");
      row.appendChild($("p", "", "Reto " + item.position));
      const input = $("input", "lf-curriculum-input");
      input.type = "text";
      input.autocomplete = "off";
      const actions = $("div", "lf-curriculum-actions");
      const listen = $("button", "secondary", "🔊 Escuchar");
      listen.type = "button";
      listen.addEventListener("click", () => speak(item.audio));
      const check = $("button", "primary", "Comprobar");
      check.type = "button";
      const feedback = $("p", "lf-curriculum-feedback", "");
      check.addEventListener("click", () => {
        const norm = value => String(value || "").toLowerCase().trim().replace(/[.!?]+$/, "").replace(/\s+/g, " ");
        const ok = norm(input.value) === norm(item.expectedAnswer);
        feedback.textContent = ok ? "¡Muy bien! La frase es correcta." : "Revisa la escritura y vuelve a intentarlo.";
        feedback.dataset.result = ok ? "correct" : "incorrect";
      });
      actions.append(listen, check);
      row.append(input, actions, feedback);
      prompt.appendChild(row);
    });
    const details = $("details", "lf-curriculum-theory");
    details.appendChild($("summary", "", "Ver texto modelo"));
    details.appendChild($("p", "", data.exercise.modelText || ""));
    prompt.appendChild(details);
    panel.appendChild(prompt);
    return panel;
  }
  function renderSpeaking(mission) {
    const data = mission.sections.find(s => s.sectionKey === "speaking");
    const panel = sectionPanel("speaking", "Speaking · Expresión oral", "Responde en voz alta. Escucha el modelo y crea tu propia respuesta.");
    data.exercise.items.forEach(item => {
      const card = $("article", "lf-curriculum-card");
      card.appendChild($("p", "lf-curriculum-prompt", item.prompt));
      const details = $("details");
      details.appendChild($("summary", "", "Ver respuesta modelo"));
      details.appendChild($("p", "", item.modelAnswer));
      const button = $("button", "secondary", "🔊 Escuchar modelo");
      button.type = "button";
      button.addEventListener("click", () => speak(item.modelAnswer));
      card.append(button, details);
      panel.appendChild(card);
    });
    return panel;
  }
  function renderListening(mission) {
    const data = mission.sections.find(s => s.sectionKey === "listening");
    const panel = sectionPanel("listening", "Listening · Comprensión auditiva", "Escucha el audio y completa las diez palabras.");
    const play = $("button", "primary", "▶ Escuchar el audio");
    play.type = "button";
    play.addEventListener("click", () => speak(data.exercise.content.audio));
    panel.appendChild(play);
    const bank = data.exercise.content.wordBank;
    const grid = $("div", "lf-curriculum-quiz");
    data.exercise.items.forEach(item => {
      const row = $("label", "lf-curriculum-card", "Hueco " + item.position);
      const select = $("select", "lf-curriculum-input");
      select.appendChild($("option", "", "Elige una palabra"));
      bank.forEach(word => {
        const option = $("option", "", word.word);
        option.value = word.wordId;
        select.appendChild(option);
      });
      const feedback = $("span", "lf-curriculum-feedback", "");
      const check = $("button", "secondary", "Comprobar");
      check.type = "button";
      check.addEventListener("click", () => {
        const ok = select.value === item.expectedWordId;
        feedback.textContent = ok ? "Correcto" : "Vuelve a escuchar";
        feedback.dataset.result = ok ? "correct" : "incorrect";
      });
      row.append(select, check, feedback);
      grid.appendChild(row);
    });
    panel.appendChild(grid);
    const transcript = $("details", "lf-curriculum-theory");
    transcript.appendChild($("summary", "", "Ver transcripción"));
    transcript.appendChild($("p", "", data.exercise.content.transcriptTemplate.replace(/\[\[gap-\d{2}\]\]/g, "_____")));
    panel.appendChild(transcript);
    return panel;
  }
  async function init() {
    const marker = document.querySelector(".tag");
    const match = marker && marker.textContent.match(/MISIÓN\s+(\d{3})/i);
    if (!match) return;
    const response = await fetch("/api/curriculum/a1/" + match[1], { headers: { accept: "application/json" } });
    if (!response.ok) return;
    const mission = await response.json();
    const nav = document.querySelector("main nav");
    const main = document.querySelector("main");
    if (!nav || !main || !Array.isArray(mission.sections) || mission.sections.length !== 8) return;
    const renderers = {
      grammar: renderGrammar, pronunciation: renderPronunciation, reading: renderReading,
      writing: renderWriting, speaking: renderSpeaking, listening: renderListening
    };
    const panels = {};
    mission.sections.slice(2).forEach(section => {
      const button = $("button", "", labels[section.sectionKey]);
      button.type = "button";
      button.dataset.tab = section.sectionKey;
      nav.appendChild(button);
      const panel = renderers[section.sectionKey](mission);
      panels[section.sectionKey] = panel;
      main.appendChild(panel);
    });
    const ordered = ["explore","practice","grammar","pronunciation","reading","writing","speaking","listening"];
    ordered.forEach(id => {
      const button = nav.querySelector('[data-tab="' + id + '"]');
      const panel = document.getElementById(id);
      if (button) { button.textContent = labels[id]; nav.appendChild(button); }
      if (panel) main.appendChild(panel);
    });
    nav.querySelectorAll("[data-tab]").forEach(button => {
      button.onclick = () => {
        nav.querySelectorAll("button").forEach(b => b.classList.toggle("active", b === button));
        main.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active", panel.id === button.dataset.tab));
      };
    });
    const style = $("style");
    style.textContent = ".lf-curriculum-quiz{display:grid;gap:12px;margin-top:18px}.lf-curriculum-card,.lf-curriculum-theory,.lf-curriculum-passage{padding:16px;border:1px solid #dbe4ff;border-radius:16px;background:#f8faff;margin:12px 0}.lf-curriculum-prompt{font-weight:800;line-height:1.5}.lf-curriculum-options,.lf-curriculum-grid,.lf-curriculum-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:10px}.lf-curriculum-option{background:#eef3ff;text-align:left}.lf-curriculum-feedback{min-height:22px;font-weight:800}.lf-curriculum-feedback[data-result=correct]{color:#18764f}.lf-curriculum-feedback[data-result=incorrect]{color:#a0443e}.lf-curriculum-tip{color:#087c9a;font-weight:700}.lf-curriculum-muted{color:#64748b}.lf-curriculum-example{margin:5px 0;font-style:italic}.lf-curriculum-input{display:block;width:100%;max-width:520px;margin:10px 0;padding:11px;border:1px solid #cbd5e1;border-radius:10px;font:inherit}.lf-curriculum-grid .lf-curriculum-card{flex:1 1 220px}.lf-curriculum-passage{font-size:17px;line-height:1.8;white-space:normal}";
    document.head.appendChild(style);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init().catch(() => {}));
  else init().catch(() => {});
})();