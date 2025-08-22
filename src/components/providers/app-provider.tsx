import { useState, useCallback, useEffect } from 'react';
import { user } from '@core';
import { AppProviderProps, UseAppContext } from '@types';
import { AppContext } from '@contexts';
import { booking } from '@/core/booking.ts';
import { getLocalStorageItem, StorageKeys } from '@/utils/index.ts';
import { translationsTemplate } from '@/assets/index.ts';

export function AppProvider({ children }: AppProviderProps) {
	const [forcedRenders, setForcedRenders] = useState<UseAppContext['forcedRenders']>(0);
	const [dialogData, setDialogData] = useState<UseAppContext['dialogData']>(null);
	const [loading, setLoading] = useState<UseAppContext['loading']>(0);
	const [translations, setTranslations] = useState<UseAppContext['translations']>(translationsTemplate);
	const [preferences, setPreferences] = useState<UseAppContext['preferences']>(
		getLocalStorageItem(StorageKeys.PREFERENCES, { lang: navigator.language })
	);

	const forceRender = useCallback(() => {
		setForcedRenders((x) => x + 1);
	}, [setForcedRenders]);

	user.setRender(forceRender);
	booking.setRender(forceRender);

	useEffect(() => {
		localStorage.setItem(StorageKeys.PREFERENCES, JSON.stringify(preferences));
	}, [preferences]);

	return (
		<AppContext.Provider
			value={{
				forcedRenders,
				forceRender,
				dialogData,
				setDialogData,
				loading,
				setLoading,
				preferences,
				setPreferences,
				translations,
				setTranslations,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
