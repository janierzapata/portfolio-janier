# CLAUDE.md — Portafolio de Janier Zapata

Contexto y reglas para cualquier agente que trabaje en este repositorio.

## Qué es

Portafolio personal de una sola página (scroll): Inicio, Sobre mí, Proyectos,
Habilidades, Experiencia y Contacto. Proyecto personal, independiente de
cualquier empresa.

## Método de diseño

El estilo **no se diseña a ojo**: sale de `design/DESIGN.md` (exportado de
Refero Styles o de una web de referencia). Los valores de ese archivo se
vuelven variables CSS en `web/src/styles/tokens.css`, y los componentes solo
consumen variables — nunca un hex, un tamaño o una sombra sueltos.

Mientras no exista `design/DESIGN.md`, `tokens.css` tiene valores neutros
provisionales (marcados en su cabecera). Al llegar el DESIGN.md se reemplaza
**solo** `tokens.css` (y las fuentes en `main.tsx`); el resto no debería cambiar.

Estructura y legibilidad siguen reglas de UI/UX: jerarquía clara, contraste
AA mínimo, foco visible, objetivos táctiles ≥ 44 px, `prefers-reduced-motion`.

## Stack

- React 19 + Vite + TypeScript estricto (**sin `any`**).
- CSS plano con variables (`tokens.css` + `global.css`). Sin CSS-in-JS ni
  estilos inline: la CSP de producción no los necesita y así queda.
- Fuentes auto-hospedadas con `@fontsource` (sin CDN: `script-src 'self'`).
- Contenido en `web/src/content/*.json`, tipado en `content/types.ts`.
  Para cambiar textos o proyectos se edita el JSON, no los componentes.
- Sin API ni base de datos. El contacto es `mailto:` y enlaces a redes.

## Convenciones

- Textos visibles y comentarios en **español**; identificadores en **inglés**.
- Los comentarios explican el **porqué**, no el qué.
- Commits cortos.
- Un campo de contenido vacío (`""`) se oculta en la interfaz: así un dato
  pendiente nunca sale publicado como «pendiente».

## Calidad (criterio de aprobación)

`npm run typecheck`, `npm run lint`, `npm run build` en verde y Lighthouse ≥ 90
en las cuatro categorías.

## Despliegue

Mismo patrón que Finanzas y Dentalis:

- `ci.yml` (Integración): instalar, tipos, lint, build, Trivy, push a GHCR con
  el SHA del commit en cada merge a `main`.
- `deploy.yml` (Despliegue): tag `release-X.Y.Z` → verifica que la imagen
  existe → copia `docker-compose.prod.yml` y `.env` → `docker compose up -d`.
- El VPS nunca clona ni compila. Sin `ports` en producción: solo `proxy_caddy`
  alcanza el contenedor por la red `proxy`.
- Contenedor `nginx-unprivileged` en el puerto 8080.
- CSP propia en `deploy/Caddyfile.bloque`.

## Seguridad

- `.env` fuera de git; `.env.example` sin valores.
- `npm ci` con lockfile; `npm audit` y Dependabot.
- Si algún día se añade formulario de contacto: aviso de privacidad según la
  Ley 1581 de 2012 (Colombia) y API NestJS aparte.
