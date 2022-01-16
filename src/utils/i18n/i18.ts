import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { AVAILABLE_SYSTEM_LANGS } from 'Constants';
import pl from './pl.json';

export const resources = { pl };

i18n.use(initReactI18next).init({
  resources,
  initImmediate: false,
  fallbackLng: 'pl',
  supportedLngs: AVAILABLE_SYSTEM_LANGS,
  defaultNS: 'translations',
  debug: false,
  react: {
    useSuspense: true,
  },
});
