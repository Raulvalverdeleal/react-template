import { useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/page-wrapper.tsx';
import { usePreferences } from '@/hooks/use-preferences.ts';
import { useEffect } from 'react';

export function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const preferences = usePreferences();

	function onError() {
		if (location.pathname.includes('error')) {
			return;
		}
		navigate('/error');
	}

	function subscribe() {
		addEventListener('error', onError);
		addEventListener('unhandledrejection', onError);
	}

	function unSubscribe() {
		removeEventListener('error', onError);
		removeEventListener('unhandledrejection', onError);
	}

	function handleLanguage() {
		const params = new URLSearchParams(window.location.search);
		const language = params.get('language');
		if (language) {
			preferences.setLang(language);
		}
	}

	useEffect(() => {
		subscribe();
		handleLanguage();
		return () => unSubscribe();
	}, []);

	return <PageWrapper key={preferences.lang} />;
}
