# LinguaFly · linguaflynew2

Nueva base de la plataforma LinguaFly con Next.js y Cloudflare Workers mediante OpenNext.

## Arquitectura y destino

- Repositorio: `linguafly6-ui/linguaflynew2`.
- Worker de destino existente: `linguaflyapp1` (no crear un Worker nuevo).
- Framework: Next.js App Router + OpenNext para Cloudflare.
- Sitio: `https://linguafly.app`.

## Recursos Cloudflare referenciados

- `DB`: D1 `blog`.
- `COURSE_DB`: D1 `linguafly-learning`.
- `LINGUAFLY_MEDIA`: R2 `linguafly-media`.
- `AI`: Workers AI.
- `IMAGES`: Cloudflare Images.
- `WORKER_SELF_REFERENCE`: servicio `linguaflyapp1`.

Los secretos existentes no se guardan en este repositorio ni deben sobrescribirse desde esta configuración.

## Desarrollo local

```bash
npm install
npm run dev
```

## Estado

- [x] Repositorio y esqueleto Next.js App Router.
- [x] Configuración inicial OpenNext/Wrangler dirigida al Worker existente `linguaflyapp1`.
- [x] Referencias a D1 de blog y aprendizaje y R2 de medios.
- [ ] Validar dependencias y build en CI.
- [ ] Validar compatibilidad de bindings con el Worker existente.
- [ ] Completar y probar rutas de blog y academia.
- [ ] Implementar autenticación y progreso del alumno mediante la integración existente.
- [ ] Revisar SEO, accesibilidad y despliegue.

**Seguridad:** no se ejecutan migraciones, escrituras en D1 ni despliegues de producción como parte de esta preparación.
