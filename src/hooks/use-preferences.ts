import config from '@/config/index.json' with { type: 'json' };
import { useApp } from '@/hooks/use-app.ts';
import { translator } from '@/utils/symbols.ts';

export function usePreferences() {
	const { preferences, setPreferences } = useApp();
	return {
		...preferences,
		setLang(lang: string) {
			if (!config.translations.supportedLanguages.includes(lang.toLocaleLowerCase())) {
				console.error(`Language ${lang} not spported`);
				return;
			}
			translator.setLang(lang);
			setPreferences((prev) => ({ ...prev, lang }));
		},
	};
}
