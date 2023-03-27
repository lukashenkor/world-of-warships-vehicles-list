import { AllLocalizationsType } from './types/LocalizationType';
import { createContext } from "react";
import { getUserLocale } from './utils/lang';


export const LocaleContext = createContext<AllLocalizationsType>(getUserLocale());