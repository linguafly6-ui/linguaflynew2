# LinguaFly · linguaflynew2

Nueva base de la plataforma LinguaFly con Next.js y Cloudflare Workers mediante OpenNext.

## Estado

- [x] Repositorio inicializado.
- [x] Esqueleto Next.js App Router.
- [x] Configuración inicial de OpenNext y Wrangler.
- [x] Referencias a las bases D1 existentes (blog y aprendizaje).
- [x] Referencia al bucket R2 de medios.
- [ ] Validar instalación y build en CI.
- [ ] Conectar lecturas de contenido y cursos.
- [ ] Implementar autenticación y progreso del alumno.
- [ ] Revisar rutas, SEO, accesibilidad y despliegue.

## Desarrollo local

```bash
npm install
npm run dev
```

## Cloudflare

El Worker nuevo se llama `linguaflynew2`. La configuración declara bindings a los recursos existentes:

- `DB`: D1 `blog`.
- `COURSE_DB`: D1 `linguafly-learning`.
- `LINGUAFLY_MEDIA`: R2 `linguafly-media`.
- `AI`: Workers AI.

**Seguridad:** no se incluyen secretos ni se ejecutan migraciones sobre las bases de datos. Los comandos de despliegue están definidos, pero no se ha desplegado el Worker ni se ha cambiado el tráfico de producción.
