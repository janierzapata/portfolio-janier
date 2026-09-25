import { Fragment } from 'react';
import { profile } from '../content';
import { useCurrentYear } from '../hooks/useCurrentYear';

interface WithYearsProps {
  /** Texto con el marcador `{years}`. */
  text: string;
}

/** Reemplaza `{years}` por el año actual menos `careerStartYear`. */
export function WithYears({ text }: WithYearsProps) {
  const years = useCurrentYear() - profile.careerStartYear;
  const parts = text.split('{years}');
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? years : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}
