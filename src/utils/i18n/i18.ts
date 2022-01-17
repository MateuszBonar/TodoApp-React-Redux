import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { AVAILABLE_SYSTEM_LANGS, DEFAULT_SYSTEM_LANG } from 'Constants';
import pl from './pl.json';
import en from './en.json';

export const resources = { pl, en };

i18n.use(initReactI18next).init({
  resources,
  initImmediate: false,
  fallbackLng: DEFAULT_SYSTEM_LANG,
  supportedLngs: AVAILABLE_SYSTEM_LANGS,
  defaultNS: 'translations',
  debug: false,
});
