# Actualización controlada: Next.js / OpenNext

## Contexto

El build de Preview completó `next build` y falló después, durante `Bundling the OpenNext server`, con un deadlock de esbuild (`ThreadSafeWaitGroup.Wait` / `scanner.scanAllDependencies`). El log posterior termina en `Killed`; no hay evidencia suficiente para atribuirlo a un paquete concreto ni para afirmar que sea un OOM.

## Cambios aplicados en esta rama

- `package.json`: `next` fijado a `16.4.6`.
- `package.json`: `@opennextjs/cloudflare` fijado a `1.20.18`.
- Wrangler se mantiene en el rango existente; el lockfile anterior resolvía `4.156.1`.
- React, TypeScript y el resto de dependencias no se han cambiado.

Motivo: OpenNext 1.20.16 elevó el mínimo compatible de Next a 16.4.5; Next 16.4.6 es un parche posterior. OpenNext 1.20.18 era la versión más reciente consultada el 24-11-2026. Esta actualización es una prueba controlada, no una solución demostrada al deadlock.

## Validación pendiente obligatoria

**Importante:** `package-lock.json` todavía conserva el árbol previo. No se ha regenerado porque este entorno no dispone de ejecución npm. No ejecutar `npm ci`, builds ni despliegues hasta regenerar y revisar el lockfile.

En un entorno con npm, desde esta rama:

1. Ejecutar `npm install --package-lock-only --ignore-scripts`.
2. Revisar el diff de `package-lock.json` y comprobar las versiones efectivas de Next, OpenNext, `@opennextjs/aws` y esbuild.
3. Ejecutar `npm ci` para validar que manifiesto y lockfile son consistentes.
4. Solo después, y con autorización separada, ejecutar el build de Preview `npx opennextjs-cloudflare build` y guardar el log completo.
5. No desplegar a producción como parte de esta prueba.

No se ha ejecutado ningún build ni despliegue.