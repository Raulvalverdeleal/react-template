import { config } from '@utils';
import { TranslationKey, TranslationsRecord, TranslatorConstructor } from '@types';

export class Translator {
	private rgx: RegExp;
	private fallbackRgx: RegExp;
	private fallbackLang: string;
	private lang: string;
	private translations: TranslationsRecord;

	constructor(data: TranslatorConstructor) {
		this.translations = data.translations;
		this.fallbackLang = data.fallbackLang;
		this.lang = data.lang;
		this.rgx = new RegExp(`\\[:${this.lang}\\]([^\\[]+)\\[:`, 'g');
		this.fallbackRgx = new RegExp(`\\[:${this.fallbackLang}\\]([^\\[]+)\\[:`, 'g');
	}

	getTranslationCount() {
		return Object.keys(this.translations).length;
	}

	mergeTranslations(translations: TranslationsRecord) {
		if (!translations) return;
		this.translations = { ...this.translations, ...translations };
		return this;
	}

	getTranslationValue(key: TranslationKey) {
		const template = this.translations[key];
		if (!template) {
			return key;
		}
		if (typeof template === 'string') {
			return template;
		}
		return template[this.lang] ?? key;
	}

	hasTranslation(key: TranslationKey) {
		return !!this.translations[key];
	}

	extractTranslationFromString(str: string): string {
		const hasLanguage = str.includes(`[:${this.lang}]`);
		const hasFallbackLanguage = str.includes(`[:${this.fallbackLang}]`);
		let match = null;
		this.rgx.lastIndex = 0;
		this.fallbackRgx.lastIndex = 0;

		if (hasLanguage) match = this.rgx.exec(str);
		else if (hasFallbackLanguage) match = this.fallbackRgx.exec(str);
		else return this.getTranslationValue(str);
		return match ? match[1] : str;
	}

	applyPlaceholdersToTemplate(template: string, ...placeholders: (string | number)[]) {
		let replaceIndex = 0;

		return template.replace(/%[a-z0-9-]{1,}/g, (match) => {
			let result = '';

			switch (match) {
				case '%end':
					result = '</span>';
					break;
				case '%break':
					result = '<br />';
					break;
				case '%s':
					result = String(placeholders[replaceIndex] ?? '');
					replaceIndex = replaceIndex === Math.max(0, placeholders.length - 1) ? 0 : replaceIndex + 1;
					break;
				default:
					result = `<span class="${match.substring(1)}">`;
					break;
			}

			return result;
		});
	}

	get(str: TranslationKey, ...placeholders: (string | number)[]) {
		const result = this.extractTranslationFromString(this.getTranslationValue(String(str)));
		return this.applyPlaceholdersToTemplate(result, ...placeholders);
	}

	json() {
		return this.translations;
	}

	setLang(lang: string) {
		this.lang = lang;
		this.rgx = new RegExp(`\\[:${this.lang}\\]([^\\[]+)\\[:`, 'g');
		return this;
	}

	static translate(
		key: TranslationKey,
		{ translations, lang, placeholders = [] }: TranslatorConstructor & { placeholders: (string | number)[] }
	) {
		const value = translations[key];

		if (!value) return key;

		let template: string;

		if (typeof value === 'string') {
			template = value;
		} else {
			template = value[lang] ?? value[config.defaultLang] ?? key;
		}

		const rgx = new RegExp(`\\[:${lang}\\]([^\\[]+)\\[:`, 'g');
		const fallbackRgx = new RegExp(`\\[:${config.defaultLang}\\]([^\\[]+)\\[:`, 'g');

		let result = template;
		if (template.includes(`[:${lang}]`)) {
			const match = rgx.exec(template);
			result = match ? match[1] : template;
		} else if (template.includes(`[:${config.defaultLang}]`)) {
			const match = fallbackRgx.exec(template);
			result = match ? match[1] : template;
		}

		let replaceIndex = 0;
		result = result.replace(/%[a-z0-9-]{1,}/g, (match) => {
			switch (match) {
				case '%end':
					return '</span>';
				case '%break':
					return '<br />';
				case '%s':
					const out = String(placeholders[replaceIndex] ?? '');
					replaceIndex = replaceIndex === Math.max(0, placeholders.length - 1) ? 0 : replaceIndex + 1;
					return out;
				default:
					return `<span class="${match.substring(1)}">`;
			}
		});

		return result;
	}

	static isSupportedLanguage(language: string) {
		return config.supportedLanguages.includes(language) || config.defaultLang === language;
	}
}
