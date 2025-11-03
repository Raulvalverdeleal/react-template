import { Dispatch, SetStateAction } from 'react';
import type { DialogData } from '@/types/global.d.ts';

export type Preferences = {
	lang: string;
};

export type UseAppContext = {
	forcedRenders: number;
	forceRender: () => void;
	dialogData: DialogData | null;
	setDialogData: Dispatch<SetStateAction<UseAppContext['dialogData']>>;
	loading: number;
	setLoading: Dispatch<SetStateAction<UseAppContext['loading']>>;
	preferences: Preferences;
	setPreferences: Dispatch<SetStateAction<UseAppContext['preferences']>>;
};
