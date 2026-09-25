import { useEffect, useState } from 'react';
import { mailtoUrl } from '../content';
import { Icon } from './Icon';

interface CopyEmailButtonProps {
  email: string;
}

type Status = 'idle' | 'copied';

// Copiar en vez de `mailto:`: el enlace de correo no hace nada si el equipo
// no tiene un cliente configurado (lo normal con Gmail web), y copiar
// funciona siempre. Solo si el navegador bloquea el portapapeles —página sin
// HTTPS, permiso denegado— se cae al `mailto:` como último recurso.
export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status !== 'copied') return;
    const timer = window.setTimeout(() => setStatus('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      window.location.href = mailtoUrl();
    }
  };

  const copied = status === 'copied';
  return (
    <>
      <button type="button" className="btn btn--primary btn--copy" onClick={copy} title={email}>
        <Icon name={copied ? 'check' : 'copy'} />
        {copied ? '¡Correo copiado!' : 'Copiar correo'}
      </button>
      {/* Los lectores de pantalla no ven el cambio de texto del botón si el
          foco no se mueve; esta región lo anuncia. */}
      <span className="visually-hidden" role="status" aria-live="polite">
        {copied ? `Correo ${email} copiado al portapapeles` : ''}
      </span>
    </>
  );
}
