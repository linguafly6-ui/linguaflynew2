(function () {
  "use strict";
  var activeRequest = null;
  var activeAudio = null;
  var activeUrl = null;

  function stop() {
    if (activeRequest) {
      activeRequest.abort();
      activeRequest = null;
    }
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.removeAttribute("src");
      activeAudio.load();
      activeAudio = null;
    }
    if (activeUrl) {
      URL.revokeObjectURL(activeUrl);
      activeUrl = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function browserFallback(text, rate) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = rate;
    var voice = window.speechSynthesis.getVoices().find(function (candidate) {
      return candidate.lang && candidate.lang.toLowerCase() === "en-gb";
    });
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  async function speak(text, options) {
    options = options || {};
    var phrase = String(text || "").trim();
    if (!phrase) return;

    var rate = Number(options.rate);
    if (!Number.isFinite(rate)) rate = 0.9;
    rate = Math.min(1.2, Math.max(0.7, rate));
    stop();

    var controller = new AbortController();
    activeRequest = controller;
    try {
      var response = await fetch("/api/audio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: phrase }),
        signal: controller.signal
      });
      if (!response.ok) throw new Error("TTS request failed: " + response.status);
      var blob = await response.blob();
      if (!blob.size) throw new Error("TTS returned empty audio.");
      if (controller.signal.aborted) return;

      var url = URL.createObjectURL(blob);
      var audio = new Audio(url);
      activeUrl = url;
      activeAudio = audio;
      audio.playbackRate = rate;

      function cleanup() {
        if (activeAudio === audio) activeAudio = null;
        if (activeUrl === url) activeUrl = null;
        URL.revokeObjectURL(url);
      }
      audio.addEventListener("ended", cleanup, { once: true });
      audio.addEventListener("error", cleanup, { once: true });
      await audio.play();
    } catch (error) {
      if (controller.signal.aborted) return;
      console.warn("Linguafly Cloudflare TTS unavailable; using browser speech.", error);
      if (activeRequest === controller) activeRequest = null;
      browserFallback(phrase, rate);
    } finally {
      if (activeRequest === controller) activeRequest = null;
    }
  }

  window.LFCloudAudio = { speak: speak, stop: stop };
})();
