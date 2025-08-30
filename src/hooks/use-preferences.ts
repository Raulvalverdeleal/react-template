import { useApp } from './use-app.ts';
import { Translator } from '@/utils/index.ts';

export function usePreferences() {
	const { preferences, setPreferences } = useApp();

	return {
		...preferences,
		setLang(lang: string) {
			if (!Translator.isSupportedLanguage(lang)) {
				console.error(`Language ${lang} not spported`);
				return;
			}
			setPreferences((prev) => ({ ...prev, lang }));
		},
	};
}
