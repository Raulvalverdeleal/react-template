import { translations } from '@assets';
import { StateOptions, TranslationKey, TranslationsRecord, TranslatorData } from '@types';
import { State } from './state.ts';

export class Translator extends State<TranslatorData> {
	#rgx: RegExp;
	#fallbackRgx: RegExp;

	constructor(data: TranslatorData, opts?: StateOptions) {
		super(data, opts);
		this.#rgx = new RegExp(`\\[:${this.data.lang}\\]([^\\[]+)\\[:`, 'g');
		this.#fallbackRgx = new RegExp(`\\[:${this.data.fallbackLang}\\]([^\\[]+)\\[:`, 'g');
	}

	getTranslationCount() {
		return Object.keys(translations).length;
	}

	mergeTranslations(translations: TranslationsRecord) {
		if (!translations) return;
		this.setData({ translations: { ...this.data.translations, ...translations } });
		return this;
	}

	getTranslation(key: TranslationKey) {
		const template = this.data.translations[key];
		if (!template) {
			return key;
		}
		if (typeof template === 'string') {
			return template;
		}
		return template[this.data.lang ?? this.data.fallbackLang] ?? key;
	}

	hasTranslation(key: TranslationKey) {
		return !!this.data.translations[key];
	}

	extractTranslationFromString(str: string): string {
		const hasLanguage = str.includes(`[:${this.data.lang}]`);
		const hasFallbackLanguage = str.includes(`[:${this.data.fallbackLang}]`);
		let match = null;
		this.#rgx.lastIndex = 0;
		this.#fallbackRgx.lastIndex = 0;

		if (hasLanguage) match = this.#rgx.exec(str);
		else if (hasFallbackLanguage) match = this.#fallbackRgx.exec(str);
		else return this.getTranslation(str);
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
		const result = this.extractTranslationFromString(this.getTranslation(str));
		return this.applyPlaceholdersToTemplate(result, ...placeholders);
	}

	json() {
		return this.data.translations;
	}

	get lang() {
		return this.data.lang;
	}

	setLang(lang: string) {
		this.setData({ lang });
		this.#rgx = new RegExp(`\\[:${this.data.lang}\\]([^\\[]+)\\[:`, 'g');
		return this;
	}
}

export const translator = new Translator({
	translations,
	fallbackLang: 'en',
	lang:
		new URLSearchParams(window.location.search).get('lang')?.toLocaleLowerCase() ??
		document.querySelector('html')?.getAttribute('lang'),
});
export const __ = (str: TranslationKey, ...placeholders: (string | number)[]) => translator.get(str, ...placeholders);
