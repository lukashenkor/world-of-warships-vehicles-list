export const localizations = [
  "ru",
  "fr",
  "en",
  "nl",
  "th",
  "pt_br",
  "zh_cn",
  "ko",
  "de",
  "tr",
  "it",
  "zh_sg",
  "uk",
  "es",
  "cs",
  "es_mx",
  "ja",
  "pl",
  "zh_tw",
] as const

export type AllLocalizationsType =
  | "ru"
  | "fr"
  | "en"
  | "nl"
  | "th"
  | "pt_br"
  | "zh_cn"
  | "ko"
  | "de"
  | "tr"
  | "it"
  | "zh_sg"
  | "uk"
  | "es"
  | "cs"
  | "es_mx"
  | "ja"
  | "pl"
  | "zh_tw"
;



export type LocalizationType = {
  shortmark: {
    [key in AllLocalizationsType]: string
  },
  description: {
    [key in AllLocalizationsType]: string
  },
  mark: {
    [key in AllLocalizationsType]: string
  },
}

