import { Dispatch, RefObject, SetStateAction } from 'react';
import { DialogData } from '@types';

export type UserData = {
	id: number;
	email: string;
	name: string;
	token: string | null;
};

export type UseAppContext = {
	forcedRenders: number;
	lastPage: RefObject<string>;
	forceRender: Dispatch<SetStateAction<number>>;
	dialogData: DialogData | null;
	setDialogData: Dispatch<SetStateAction<DialogData | null>>;
};
