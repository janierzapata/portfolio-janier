import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

// Todos los botones del sitio son enlaces: no hay formularios ni acciones
// que no sean navegar. Un enlace externo abre en otra pestaña y corta el
// `window.opener` para que la página destino no pueda manipular esta.
export function ButtonLink({
  variant = 'ghost',
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const external = typeof href === 'string' && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={['btn', `btn--${variant}`, className].filter(Boolean).join(' ')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
