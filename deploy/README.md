# Poner el portafolio en el VPS

Mismo servidor y mismo mecanismo que Finanzas y Dentalis: el Caddy compartido
de `/opt/proxy` pone TLS, y el despliegue baja una imagen ya publicada en GHCR.
El portafolio **no publica puertos** ni necesita base de datos.

```
git push main ──▶ Integración ──▶ imagen en GHCR (tag = SHA)
                                        │
git tag release-1.0.0 ──▶ Despliegue ───┘──▶ scp compose+.env ──▶ pull ──▶ up
```

| Pieza      | Decisión                                              |
|------------|-------------------------------------------------------|
| Dominio    | `portafolio.janierzapata.com` (registro en Hostinger, DNS en Cloudflare «Solo DNS»); la raíz, `www` y `janier.controlapp.com.co` redirigen con 301 |
| Borde      | El Caddy de `/opt/proxy`, con CSP propia              |
| Contenedor | `nginx-unprivileged`, puerto 8080, solo en la red `proxy` |
| Carpeta    | `/opt/portfolio`                                      |

---

## 1. Comprobar el terreno

```bash
docker network ls | grep proxy          # la red del Caddy compartido
dig +short portafolio.janierzapata.com                   # debe dar la IP del VPS
curl -s ifconfig.me
```

Con Cloudflare, la nube en **«Solo DNS»** (gris) hasta que el certificado se
emita: con la naranja Let's Encrypt no valida por HTTP-01.

## 2. Secrets del repositorio

En *Settings → Secrets and variables → Actions*:

| Secret        | Valor                                   |
|---------------|-----------------------------------------|
| `VPS_HOST`    | IP o nombre del VPS                     |
| `VPS_USER`    | usuario con acceso a Docker             |
| `VPS_SSH_KEY` | llave privada ed25519 de despliegue     |
| `VPS_PORT`    | opcional, 22 por defecto                |

Variable opcional: `PROXY_NETWORK` (por defecto `proxy`).

El workflow usa el entorno `produccion`: créalo en *Settings → Environments*
y, si quieres, exige aprobación manual antes de cada despliegue.

El `.env` de producción no tiene plantilla con valores: lo escribe
`deploy.yml` y solo lleva `GITHUB_REPOSITORY`, `IMAGE_TAG` y `PROXY_NETWORK`.

## 3. La imagen en GHCR

La primera vez que Integración publica, el paquete queda privado. El VPS se
autentica con el `GITHUB_TOKEN` del workflow, así que no hace falta hacerlo
público. Si prefieres que lo sea (es un portafolio), cámbialo en la página del
paquete.

## 4. Caddy

Copia el bloque de `deploy/Caddyfile.bloque` al final de `/opt/proxy/Caddyfile`
y recarga:

```bash
cd /opt/proxy
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

## 5. Primer despliegue

```bash
git tag release-1.0.0
git push origin release-1.0.0
```

## 6. Comprobar

```bash
docker ps --filter name=portfolio-web          # healthy
curl -sI https://portafolio.janierzapata.com | grep -iE 'content-security|strict-transport|x-frame|x-content'
```

Y una pasada en <https://securityheaders.com> y Lighthouse antes de compartir
el enlace.

## Volver atrás

El despliegue guarda el SHA anterior en `/opt/portfolio/.version-anterior`:

```bash
cd /opt/portfolio
sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=$(cat .version-anterior)/" .env
docker compose -f docker-compose.prod.yml --env-file .env up -d
```

## Revisión antes del primer release

- [ ] Cabeceras: CSP, HSTS (del snippet `seguras`), `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- [ ] `server_tokens off`: la respuesta no dice la versión de nginx.
- [ ] OWASP Top 10 aplicable a un sitio estático: sin formularios, sin secretos en el bundle (`grep -r` en `dist/`), dependencias sin vulnerabilidades altas.
- [ ] Lighthouse ≥ 90 en las cuatro categorías, en móvil.
