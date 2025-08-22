import { config } from '@/assets/index.ts';
import { useApp } from './use-app.ts';

export function usePreferences() {
	const { preferences, setPreferences } = useApp();

	return {
		...preferences,
		setLang(lang: string) {
			if (!config.supportedLanguages.includes(lang)) {
				console.error(`Language ${lang} not spported`);
				return;
			}
			setPreferences((prev) => ({ ...prev, lang }));
		},
	};
}
