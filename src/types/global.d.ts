import translationsTemplate from '@/assets/translations.json' with { type: 'json' };

export type IconName =
	| 'whatsapp'
	| 'error'
	| 'linkedin'
	| 'instagram'
	| 'github'
	| 'not-found'
	| 'guidelines'
	| 'call'
	| 'mail'
	| 'arrow'
	| 'contact-email';

export type NumFormats = 'X€' | '0X';

type DialogDataMap = {
	error: {
		title: string;
		message?: string;
	};
	understood: {
		title: string;
		message?: string;
	};
};

export type DialogData = {
	[K in keyof DialogDataMap]: {
		view: K;
		showCloseButton?: boolean;
	} & DialogDataMap[K];
}[keyof DialogDataMap];

declare global {
	function __(str: keyof typeof translationsTemplate | (string & {}), ...placeholders: (string | number)[]): string;
}
