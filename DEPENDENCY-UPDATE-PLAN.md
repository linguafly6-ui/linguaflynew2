# Plan de actualización controlada: Next.js / OpenNext

## Contexto

El build de Preview completó `next build` y falló después, durante `Bundling the OpenNext server`, con un deadlock de esbuild (`ThreadSafeWaitGroup.Wait` / `scanner.scanAllDependencies`). No hay evidencia suficiente para atribuirlo a un paquete concreto ni para afirmar que sea un OOM.

Versiones fijadas en el lockfile de `main` al iniciar este trabajo:

- `next`: 16.4.4
- `@opennextjs/cloudflare`: 1.20.15
- `@opennextjs/aws`: 4.1.14
- `wrangler`: 4.156.1
- `esbuild`: 0.28.2

## Propuesta inicial (no aplicada todavía)

Actualizar conjuntamente y fijar versiones exactas:

- `next`: 16.4.6
- `@opennextjs/cloudflare`: 1.20.18
- Mantener inicialmente `wrangler`: 4.156.1 (satisface el peer range `^4.148.0` conocido del adaptador).
- Mantener React, TypeScript y el resto de dependencias sin cambios en esta primera prueba.

Motivo: OpenNext 1.20.16 elevó el mínimo compatible de Next a 16.4.5 por correcciones de seguridad; Next 16.4.6 es un parche posterior. OpenNext 1.20.18 es la versión publicada más reciente consultada el 24-11-2026. Esta actualización es una prueba controlada, no una solución demostrada al deadlock.

## Procedimiento requerido

1. Cambiar las versiones de `next` y `@opennextjs/cloudflare` en `package.json` a las versiones exactas propuestas.
2. Regenerar `package-lock.json` con npm (no editarlo manualmente):
   `npm install --package-lock-only --ignore-scripts`
3. Verificar que `npm ci` resuelve el árbol y que hay una sola versión efectiva de esbuild en el árbol relevante de OpenNext.
4. Ejecutar primero `npx opennextjs-cloudflare build` en un entorno Preview autorizado y guardar el log completo.
5. No desplegar a producción. Si el empaquetado vuelve a fallar, capturar el log desde el comienzo de `Bundling the OpenNext server` y aislar las dependencias/plugins; no aplicar cambios aleatorios de concurrencia.

## Límites de este cambio

Este documento solo registra el plan. No modifica `package.json` ni `package-lock.json`, no ejecuta builds y no realiza despliegues. El lockfile debe regenerarse con npm para evitar inconsistencias entre manifiesto y árbol bloqueado.
