import { Dispatch, SetStateAction } from 'react';
import { DialogData, TranslationsRecord } from '@types';

export type UserData = {
	id: number;
	email: string;
	name: string;
	token: string | null;
};

export type BookingStep = 'date' | 'shift' | 'products' | 'payment';

export type BookingData = {
	locator: string;
	date: string | null; //yyyy-mm-dd
	shift: Omit<Shift, 'open'> | null; //15:00 = 900 (60 * 15)
	amount: number;
	lines: BookingLineData[];
	name: string;
	email: string;
	step: BookingStep;
	acceptTerms: boolean;
};

export type ContactDetail = 'name' | 'email';

export type BookingLineData = {
	productId: number;
	price: number;
	qty: number;
	name: string;
};
export type Shift = {
	id: number;
	time: string;
	open: boolean;
};
export type Product = {
	id: number;
	name: string;
	price: number;
	active: boolean;
};
export type DateAvailability = {
	available: boolean;
};

export type Preferences = {
	lang: string;
};

export type UseAppContext = {
	forcedRenders: number;
	forceRender: Dispatch<SetStateAction<UseAppContext['forcedRenders']>>;
	dialogData: DialogData | null;
	setDialogData: Dispatch<SetStateAction<UseAppContext['dialogData']>>;
	loading: number;
	setLoading: Dispatch<SetStateAction<UseAppContext['loading']>>;
	preferences: Preferences;
	setPreferences: Dispatch<SetStateAction<UseAppContext['preferences']>>;
	translations: TranslationsRecord;
	setTranslations: Dispatch<SetStateAction<UseAppContext['translations']>>;
};
