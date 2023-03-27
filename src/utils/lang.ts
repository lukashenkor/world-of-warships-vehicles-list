import { AllLocalizationsType, localizations } from '../types/LocalizationType';

export function getUserLocale(): AllLocalizationsType {
  const localStorageLocale = localStorage.getItem('locale');
  if (localStorageLocale) {
    return localStorageLocale as AllLocalizationsType;
  } else {
    return getNavigatorLanguage();
  }
}

export function getNavigatorLanguage(): AllLocalizationsType {
  if (navigator.languages !== undefined) {
    for (let i = 0; i < navigator.languages.length; i++) {
      const lang = navigator.languages[i] as AllLocalizationsType;
      if (localizations.includes(lang)) {
        return lang;
      }
    }
  }
  return 'en';
}