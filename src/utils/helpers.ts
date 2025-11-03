import type { NumFormats } from '@/types/global.d.ts';
import { StorageKeys, translator } from '@/utils/symbols.ts';
import { format, Locale } from 'date-fns';
import config from '@/config/index.json' with { type: 'json' };
import { es, enUS as en, it, fr } from 'date-fns/locale';

export async function pause(ms?: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseJSON<K>(json: string, defaultValue: K): K {
	try {
		const parsedValue = JSON.parse(json);
		return parsedValue ?? defaultValue;
	} catch (error) {
		console.error(error);
		return defaultValue;
	}
}

export function getLocalStorageItem<K>(key: StorageKeys, defaultValue: K): K {
	const item = localStorage.getItem(key);
	if (item) {
		return parseJSON(item, defaultValue);
	}
	return defaultValue;
}

export function getSessionStorageItem<K>(key: StorageKeys, defaultValue: K): K {
	const item = sessionStorage.getItem(key);
	if (item) {
		return parseJSON(item, defaultValue);
	}
	return defaultValue;
}

export function parseNum(format: NumFormats, num: number) {
	const number = Number(num || 0);
	switch (format) {
		case 'X€':
			return new Intl.NumberFormat('es-ES', {
				style: 'currency',
				currency: 'EUR',
				maximumFractionDigits: 2,
				minimumFractionDigits: 0,
			})
				.format(number)
				.replace(/\u00A0/g, '');

		case '0X':
			return number.toString().padStart(2, '0');
	}
}

export const parseDate = (formatString: string, date: string | number | Date, utc?: boolean) => {
	try {
		const dateObj = date instanceof Date ? date : new Date(date);
		if (isNaN(dateObj.getTime())) throw new Error('Invalid date');
		const locales: Record<string, Locale> = { es, en, it, fr };
		const options = { locale: locales[translator.language] ?? locales[config.translations.baseLanguage] };
		const localDate = utc ? new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000) : dateObj;

		return format(localDate, formatString, options);
	} catch (error) {
		console.error(error);
		return 'Invalid Date';
	}
};

export function normalizePhoneNumber(phoneNumber: string) {
	return phoneNumber.replaceAll('+', '').replaceAll(/\s{1,}/g, '');
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function copy(object: object) {
	return JSON.parse(JSON.stringify(object));
}

export async function copyText(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error: unknown) {
		console.error(error);
		return false;
	}
}

export function stripHtml(html: string) {
	const tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
}
