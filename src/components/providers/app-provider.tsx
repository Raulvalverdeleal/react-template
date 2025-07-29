import { useState, useCallback, useRef } from 'react';
import { user } from '@core';
import { AppProviderProps, DialogData, RoutesValue } from '@types';
import { Routes } from '@utils';
import { AppContext } from '@contexts';

export function AppProvider({ children }: AppProviderProps) {
	const [forcedRenders, setForcedRenders] = useState(0);
	const [dialogData, setDialogData] = useState<DialogData | null>(null);

	const forceRender = useCallback(() => {
		setForcedRenders((x) => x + 1);
	}, []);

	const lastPage = useRef<RoutesValue>(Routes.HOME);
	user.setRender(forceRender);

	return (
		<AppContext.Provider
			value={{
				forcedRenders,
				forceRender,
				lastPage,
				dialogData,
				setDialogData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
