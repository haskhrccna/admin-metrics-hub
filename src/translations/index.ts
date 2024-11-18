import { en } from './en';
import { ar } from './ar';
import { fr } from './fr';

export const translations = {
  en,
  ar,
  fr,
} as const;

export type TranslationKey = keyof typeof translations;