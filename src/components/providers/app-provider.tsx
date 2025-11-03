import { useState, useEffect, ReactNode } from 'react';
import type { UseAppContext } from '@/types/core.d.ts';
import { AppContext } from '@/contexts/app-context.tsx';
import { getLocalStorageItem } from '@/utils/helpers.ts';
import { StorageKeys } from '@/utils/symbols.ts';

type AppProviderProps = {
	children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
	const [forcedRenders, setForcedRenders] = useState<UseAppContext['forcedRenders']>(0);
	const [dialogData, setDialogData] = useState<UseAppContext['dialogData']>(null);
	const [loading, setLoading] = useState<UseAppContext['loading']>(0);
	const [preferences, setPreferences] = useState<UseAppContext['preferences']>(
		getLocalStorageItem(StorageKeys.PREFERENCES, { lang: navigator.language })
	);

	function forceRender() {
		setForcedRenders((x) => x + 1);
	}

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
