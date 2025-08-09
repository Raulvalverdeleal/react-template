import { useState, useCallback } from 'react';
import { user } from '@core';
import { AppProviderProps, UseAppContext } from '@types';
import { AppContext } from '@contexts';
import { booking } from '@/core/booking.ts';

export function AppProvider({ children }: AppProviderProps) {
	const [forcedRenders, setForcedRenders] = useState<UseAppContext['forcedRenders']>(0);
	const [dialogData, setDialogData] = useState<UseAppContext['dialogData']>(null);
	const [loading, setLoading] = useState<UseAppContext['loading']>(0);

	const forceRender = useCallback(() => {
		setForcedRenders((x) => x + 1);
	}, []);

	user.setRender(forceRender);
	booking.setRender(forceRender);

	return (
		<AppContext.Provider
			value={{
				forcedRenders,
				forceRender,
				dialogData,
				setDialogData,
				loading,
				setLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
