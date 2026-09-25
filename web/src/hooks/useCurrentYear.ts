import { useEffect, useState } from 'react';

// El HTML se prerenderiza en el build, así que el primer render del navegador
// tiene que usar el MISMO año que el build para que la hidratación calce.
// Justo después se cambia al año real: si el sitio sigue publicado al pasar
// enero, los años de experiencia y el © se actualizan solos, sin redesplegar.
export function useCurrentYear(): number {
  const [year, setYear] = useState<number>(__BUILD_YEAR__);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return year;
}
