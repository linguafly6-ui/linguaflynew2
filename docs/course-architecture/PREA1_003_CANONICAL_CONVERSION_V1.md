# Pre-A1 mission 003 — canonical conversion

## Source review
- Reviewed the legacy standalone page and extracted inline scripts.
- Retained the ten original colour pairs and the original Reading passage about colours in a garden.
- Rejected Practice items 11–50 because they repeat unrelated greetings/classroom expressions. Rejected legacy Writing clothing dictations as off-topic.
- Replaced legacy Listening quiz with the approved ten-gap inline transcript and ten-word bank interaction.

## Canonical content
- Eight sections in master order, exact counts: 10 / 20 / 10 / 10 / 10 / 10 / 10 / 10.
- Explore: ten colour pairs and adjective-before-noun guidance.
- Practice: ten vocabulary translations and ten contextual colour checks.
- Grammar: ten tasks on adjective+noun order and simple descriptions.
- Pronunciation: ten cards with Spanish translations, approximate learner cues and en-GB browser TTS directives.
- Reading: original complete passage shown before ten comprehension questions.
- Writing: ten colour-word dictations.
- Speaking: ten distinct prompts/models; transcription feedback only, not phonetic scoring.
- Listening: en-GB TTS directive, ten inline gaps, ten unique bank words and select/place/move/replace interaction.

## Security
- Canonical answer keys are stored in this JSON and the authenticated submit route only.
- Learner HTML embeds a sanitised projection without expectedAnswer or expectedWordId.
- Submit route authenticates with getStudent(req) and evaluates the 60 Practice/Grammar/Reading/Writing/Listening items server-side.

## Limitations
- Browser, microphone, real audio asset and production voice selection are not verified here.
- tts:en-GB is a browser speech-synthesis directive, not a stored audio asset; actual voice depends on the learner's device.
- Speaking recognition is transcription-based, not phonetic assessment.
- No D1 attempt/progress persistence is added.
