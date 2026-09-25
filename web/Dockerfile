# syntax=docker/dockerfile:1

# ---------- compilación ----------
FROM node:22-alpine AS build
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
# Rama estable vigente de nginx (una nueva cada abril). La 1.28 quedó sin
# soporte en 2026 y ya no recibe parches. La variante `slim` no trae njs ni
# módulos extra: menos paquetes, menos superficie para CVE.
FROM nginxinc/nginx-unprivileged:1.30-alpine-slim

# La imagen base se publica cada tanto, pero Alpine saca parches de seguridad
# a diario: sin esto Trivy encuentra CVE ya corregidos y frena la Integración.
# Se sube a root solo para actualizar y se vuelve al usuario sin privilegios.
USER root
RUN apk upgrade --no-cache
USER 101

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY seguridad.inc /etc/nginx/conf.d/seguridad.inc
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/salud >/dev/null || exit 1
