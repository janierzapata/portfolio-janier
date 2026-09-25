# syntax=docker/dockerfile:1

# ---------- compilación ----------
FROM node:25-alpine3.21 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY tsconfig.json vite.config.ts index.html ./
COPY scripts ./scripts
COPY public ./public
COPY src ./src
RUN npm run build

# ---------- ejecución ----------
# nginx-unprivileged: corre como el usuario 101 y escucha en 8080. Si alguien
# lograra ejecutar algo dentro del contenedor, no sería root. Los archivos
# quedan de root y solo lectura para él: tampoco podría reescribir el sitio.
FROM nginxinc/nginx-unprivileged:1.27-alpine3.21

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY seguridad.inc /etc/nginx/conf.d/seguridad.inc
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/salud >/dev/null || exit 1
