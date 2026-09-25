import { useSyncExternalStore } from 'react';

// El año no cambia mientras la página está abierta: no hay nada a qué
// suscribirse.
const subscribe = () => () => {};
const getSnapshot = () => new Date().getFullYear();
// El HTML se prerenderiza en el build, así que al hidratar React usa el MISMO
// año que el build y la hidratación calza. Justo después toma el año real: si
// el sitio sigue publicado al pasar enero, los años de experiencia y el ©
// se actualizan solos, sin redesplegar.
const getServerSnapshot = () => __BUILD_YEAR__;

export function useCurrentYear(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
