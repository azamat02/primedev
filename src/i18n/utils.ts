import ru from './ru.json';
import kz from './kz.json';
import en from './en.json';

export type Lang = 'ru' | 'kz' | 'en';

const translations = { ru, kz, en } as const;

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split('/');
  if (langSegment === 'kz') return 'kz';
  if (langSegment === 'en') return 'en';
  return 'ru';
}

export function getLocalizedPath(lang: Lang, anchor?: string): string {
  const prefix = lang === 'ru' ? '/' : `/${lang}/`;
  return anchor ? `${prefix}#${anchor}` : prefix;
}

export const languages: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
  { code: 'en', label: 'EN' },
];
