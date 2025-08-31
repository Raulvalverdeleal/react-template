import { useState, useCallback, useEffect } from 'react';
import { AppProviderProps, UseAppContext } from '@types';
import { AppContext } from '@contexts';
import { getLocalStorageItem, StorageKeys, user, booking } from '@utils';
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
	}, []);

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
