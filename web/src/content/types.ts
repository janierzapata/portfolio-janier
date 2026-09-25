// Forma del contenido. Los JSON se validan contra estos tipos en `index.ts`,
// así un campo mal escrito rompe `tsc` en vez de salir vacío en producción.

export interface Link {
  label: string;
  /** Vacío = pendiente: el enlace no se muestra. */
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  eyebrow: string;
  tagline: string;
  location: string;
  /** Año en que empezó la experiencia profesional; los años se calculan. */
  careerStartYear: number;
  /** Admite `{years}`, que se reemplaza por los años de experiencia. */
  about: string[];
  approach: { title: string; text: string }[];
  education: { title: string; school: string; year: string }[];
  languages: string[];
  contact: {
    heading: string;
    text: string;
    email: string;
    /** Asunto y texto con los que se abre el correo nuevo. */
    emailSubject: string;
    emailBody: string;
    whatsapp: {
      /** Con indicativo y sin «+» ni espacios (57…). Vacío = no se muestra. */
      number: string;
      /** Mensaje con el que se abre el chat. */
      message: string;
    };
    cv: {
      label: string;
      /** Ruta dentro de public/. Vacío = no se muestra. */
      url: string;
      /** Nombre con el que se guarda al descargar. */
      fileName: string;
    };
    links: Link[];
  };
}

/**
 * En `problem`, `solution` y `result` se puede enlazar con la sintaxis de
 * Markdown `[texto](https://…)`. Solo https: ver components/RichText.tsx.
 */
export interface Project {
  id: string;
  name: string;
  kind: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  links: Link[];
}

export type SkillIcon =
  'cloud' | 'container' | 'pipeline' | 'code' | 'server' | 'layout' | 'database' | 'shield';

export interface SkillGroup {
  id: string;
  title: string;
  icon: SkillIcon;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface Skills {
  groups: SkillGroup[];
  certifications: Certification[];
}

export interface Role {
  company: string;
  title: string;
  start: string;
  /** Vacío = cargo actual. */
  end: string;
  summary: string;
  highlights: string[];
}
