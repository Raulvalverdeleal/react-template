import { useApp } from './use-app.ts';
import { TranslationKey } from '@/types/global.js';
import { Translator } from '@/utils/index.ts';
import { translationsTemplate } from '@/assets/index.ts';

export function useTranslator() {
	const { preferences } = useApp();

	return (key: TranslationKey, ...placeholders: (string | number)[]) => {
		return Translator.translate(key, {
			translations: translationsTemplate,
			placeholders: placeholders,
			fallbackLang: 'es',
			lang: preferences.lang,
		});
	};
}
