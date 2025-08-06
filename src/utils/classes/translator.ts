import { translations, defaultTranslations } from '@assets';
import { TranslationKey } from '@types';

export class Translator {
	#translations: Map<string, string>;
	#lang: string;
	#fallbackLang: string;
	#rgx: RegExp;
	#fallbackRgx: RegExp;

	constructor(defaultTranslations: Record<string, string>, lang: string, fallbackLang: string) {
		this.#translations = new Map(Object.entries(defaultTranslations));

		this.#lang = lang;
		this.#fallbackLang = fallbackLang;
		this.#rgx = new RegExp(`\\[:${this.#lang}\\]([^\\[]+)\\[:`, 'g');
		this.#fallbackRgx = new RegExp(`\\[:${fallbackLang}\\]([^\\[]+)\\[:`, 'g');
	}

	getTranslationCount() {
		return this.#translations.size;
	}

	mergeTranslations(translations?: Record<string, string>) {
		if (!translations) return;
		Object.entries(translations).forEach(([key, value]) => this.#translations.set(key, value));
	}

	getTranslation(key: TranslationKey) {
		const template = this.#translations.get(key);
		if (!this.#translations.has(key)) this.#translations.set(key, key);
		return template ?? key;
	}

	hasTranslation(key: TranslationKey) {
		return this.#translations.has(key);
	}

	extractTranslationFromString(str: string): string {
		const hasLanguage = str.includes(`[:${this.#lang}]`);
		const hasFallbackLanguage = str.includes(`[:${this.#fallbackLang}]`);
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
		return JSON.stringify(Object.fromEntries(this.#translations.entries()));
	}
}

export const fallbackLang = 'es';
export const lang =
	new URLSearchParams(window.location.search).get('lang')?.toLocaleLowerCase() ??
	document.querySelector('html')?.getAttribute('lang') ??
	fallbackLang;

export const translator = new Translator(defaultTranslations, lang, fallbackLang);
translator.mergeTranslations(translations[lang as keyof typeof translations]);

export const __ = (str: TranslationKey, ...placeholders: (string | number)[]) => translator.get(str, ...placeholders);
