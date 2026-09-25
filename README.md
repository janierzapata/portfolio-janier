# Portafolio — Janier Zapata

Sitio personal de una sola página. React 19 + Vite + TypeScript, servido como
estáticos por Nginx detrás del Caddy compartido del VPS.

```
portfolio-janier/
├── design/                 DESIGN.md (Refero Styles) y referencias visuales
├── web/
│   ├── src/
│   │   ├── components/     botones, tarjetas, navegación
│   │   ├── sections/       inicio, sobre mí, proyectos, habilidades…
│   │   ├── content/        textos y proyectos en JSON
│   │   └── styles/         tokens.css (desde DESIGN.md) y global.css
│   ├── nginx.conf
│   └── Dockerfile
├── deploy/                 bloque de Caddy y guía de despliegue
├── .github/workflows/      ci.yml y deploy.yml
├── docker-compose.yml      probar la imagen en local
└── docker-compose.prod.yml el VPS
```

## Trabajar

```bash
cd web
npm install
npm run dev          # http://localhost:5173
```

Antes de comitear:

```bash
npm run typecheck && npm run lint && npm run build
```

## Probar la imagen

```bash
docker compose up --build     # http://localhost:8080
```

## Editar contenido

Todo el texto vive en `web/src/content/`:

| Archivo           | Qué contiene                                  |
|-------------------|-----------------------------------------------|
| `profile.json`    | nombre, cargo, frase, sobre mí, contacto      |
| `projects.json`   | proyectos: problema, solución, resultado      |
| `skills.json`     | grupos de herramientas y certificaciones      |
| `experience.json` | línea de tiempo de cargos                     |

Un campo vacío (`""`) no se muestra.

## Cambiar el estilo

Ver `design/README.md`.

## Publicar

Ver `deploy/README.md`.
