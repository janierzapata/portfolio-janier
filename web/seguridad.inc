# Cabeceras de seguridad del contenedor. Se incluyen en cada location porque # nginx no hereda
`add_header` cuando un bloque define los suyos. add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always; add_header Referrer-Policy
"strict-origin-when-cross-origin" always; add_header Permissions-Policy "camera=(), microphone=(),
geolocation=(), payment=(), usb=(), interest-cohort=()" always; add_header
Cross-Origin-Opener-Policy "same-origin" always;
