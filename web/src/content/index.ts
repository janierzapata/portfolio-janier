import profileJson from './profile.json';
import projectsJson from './projects.json';
import skillsJson from './skills.json';
import experienceJson from './experience.json';
import type { Profile, Project, Role, Skills } from './types';

// `satisfies` comprueba la forma sin ensanchar el tipo: si el JSON no calza
// con `types.ts`, el build falla aquí y no en la página.
export const profile = profileJson satisfies Profile;
export const projects = projectsJson satisfies Project[];
export const skills = skillsJson as Skills satisfies Skills;
export const experience = experienceJson satisfies Role[];

/** Quita los enlaces pendientes para que nunca salga un href vacío. */
export const withUrl = <T extends { url: string }>(items: T[]): T[] =>
  items.filter((item) => item.url.trim() !== '');

/** Enlace de WhatsApp (wa.me), o cadena vacía si no hay número. */
export const whatsappUrl = (): string => {
  const { number, message } = profile.contact.whatsapp;
  const digits = number.replace(/\D/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
};

/** `mailto:` con asunto y cuerpo ya escritos, como el mensaje de WhatsApp. */
export const mailtoUrl = (): string => {
  const { email, emailSubject, emailBody } = profile.contact;
  const params = new URLSearchParams();
  if (emailSubject) params.set('subject', emailSubject);
  if (emailBody) params.set('body', emailBody);
  // URLSearchParams codifica los espacios como «+», y varios clientes de
  // correo los muestran tal cual en el asunto. mailto espera %20.
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${email}${query ? `?${query}` : ''}`;
};
