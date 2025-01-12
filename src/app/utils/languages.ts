export const SUPPORTED_LANGUAGES = {
  "en-US": "English",
  "nl-NL": "Nederlands",
  "es-ES": "Español",
  "fr-FR": "Français",
  "de-DE": "Deutsch",
  "it-IT": "Italiano",
  "ja-JP": "日本語",
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
