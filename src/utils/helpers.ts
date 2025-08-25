import { DateFormats, NumFormats } from '@types';
import { StorageKeys } from './enums.ts';

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
export const parseDate = (format: DateFormats, date: string | number | Date, utc?: boolean) => {
	try {
		const dateObj = date instanceof Date ? date : new Date(date);
		if (isNaN(dateObj.getTime())) {
			throw new Error(`Invalid date`);
		}

		// const WEEK_DAY = utc ? dateObj.getUTCDay() : dateObj.getDay()
		const DATE = utc ? dateObj.getUTCDate() : dateObj.getDate();
		const MONTH = utc ? dateObj.getUTCMonth() : dateObj.getMonth();
		const YEAR = utc ? dateObj.getUTCFullYear() : dateObj.getFullYear();
		const HOURS = utc ? dateObj.getUTCHours() : dateObj.getHours();
		const MINUTES = utc ? dateObj.getUTCMinutes() : dateObj.getMinutes();
		// const SECONDS = utc ? dateObj.getUTCMinutes() : dateObj.getMinutes()

		const period = HOURS > 11 ? 'p.m' : 'a.m';
		const weekdayName = dateObj.toLocaleDateString('es', { weekday: 'long' });
		const shortWeekdayName = dateObj.toLocaleDateString('es', { weekday: 'short' });
		const shortMothName = dateObj.toLocaleDateString('es', { month: 'short' });
		const mothName = dateObj.toLocaleDateString('es', { month: 'long' });

		switch (format) {
			case 'YYYY-MM-DD':
				return `${YEAR}-${parseNum('0X', MONTH + 1)}-${parseNum('0X', DATE)}`;

			case 'YYYY-MM':
				return `${YEAR}-${parseNum('0X', MONTH + 1)}`;

			case 'hh:mm A':
				return `${parseNum('0X', HOURS)}:${parseNum('0X', MINUTES)} ${period}`;

			case 'hh:mm':
				return `${parseNum('0X', HOURS)}:${parseNum('0X', MINUTES)}`;

			case 'DDD, DD MMM':
				return `${shortWeekdayName}, ${parseNum('0X', DATE)} ${shortMothName}`;

			case 'DDDD DD MMMM':
				return `${weekdayName} ${parseNum('0X', DATE)} ${mothName}`;

			case 'DDD, DD MMM / hh:mm h':
				return `${shortWeekdayName}, ${parseNum('0X', DATE)} ${shortMothName} / ${parseNum('0X', HOURS)}:${parseNum('0X', MINUTES)} h`;

			case 'MMMM YYYY':
				return `${mothName} ${YEAR}`;

			case 'MMM YY':
				return `${shortMothName}' ${YEAR.toString().substring(2)}`;

			case 'DDD':
				return `${shortWeekdayName}`;

			case "D MMM'YY":
				return `${DATE} ${shortMothName}'${YEAR.toString().substring(2)}`;

			case "D MMM'YY · hh:mm":
				return `${parseNum('0X', DATE)} ${mothName} ${YEAR.toString()} · ${parseNum('0X', HOURS)}:${parseNum('0X', MINUTES)}`;
		}
	} catch (error) {
		console.error(error);
		return 'Invalid Date';
	}
};

export function normalizePhoneNumber(phoneNumber: string) {
	return phoneNumber.replaceAll('+', '').replaceAll(/\s{1,}/g, '');
}
