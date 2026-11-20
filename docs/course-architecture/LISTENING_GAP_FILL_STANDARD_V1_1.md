# Estándar canónico de Listening — v1.1.0

Obligatorio para Pre-A1, A1, A2, B1, B2 y niveles futuros.

## Formato único
1. Audio reproducible en inglés británico.
2. Texto completo con exactamente diez huecos inline: `[[gap-01]]` a `[[gap-10]]`.
3. Banco de diez palabras distintas, mezcladas en cada intento.
4. Seleccionar y colocar palabras; poder moverlas y sustituirlas. Al sustituir, la palabra desplazada vuelve al banco.
5. Corregir los diez huecos y mostrar soluciones y puntuación.

## Contrato
- `exercise.type`: `listening_gap_fill`.
- `content.audio`: referencia de audio o directiva TTS que el runtime resuelva.
- `content.audioLocale`: `en-GB`.
- `content.transcriptTemplate`: texto completo con los diez tokens ordenados.
- `content.wordBank`: diez palabras distintas con IDs estables.
- `content.interaction`: `select_place_move_replace`.
- `items`: diez huecos ordenados; cada `expectedWordId` referencia una palabra distinta del banco.

Las palabras se barajan en el runtime por intento; el orden del JSON no debe mostrarse como orden de respuesta. Se rechazan preguntas tipo test y transcripciones diferidas como sustituto del gap-fill.

Las claves de respuesta son datos protegidos de autoría/servidor y nunca deben enviarse al cliente.

## Límites del piloto
Pre-A1 001 y A1 001 declaran este mismo contrato v1.1.0. Sus valores `tts:en-GB:...` son directivas de síntesis, no archivos de audio comprobados. El validador no demuestra que el runtime reproduzca audio ni que el drag/drop funcione; eso requiere pruebas de integración y navegador.
