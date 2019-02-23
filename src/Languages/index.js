import LocalizedStrings from 'react-native-localization';

import * as en from './en.json';
import * as hi from './hi.json';

const stringsLang = new LocalizedStrings({
  en,
  hi,
});

export default stringsLang;
