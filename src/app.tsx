import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { enviroment, Enviroments } from '@utils';
import { GlobalDialog, PageWrapper } from '@components';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

export function App() {
	const navigate = useNavigate();
	const location = useLocation();

	function onError() {
		if (location.pathname !== '/error') {
			navigate('/error');
		}
	}

	function checkEnviroment() {
		const host = window.location.host;
		const isLocalhost = host.includes('localhost');
		const isPreproduction = host.includes('test'); //example: test-react-template.com

		if (enviroment !== Enviroments.PRO && !isLocalhost && !isPreproduction) {
			throw new Error('Invalid enviroment, should be production');
			//send email, trigger sentry etc.
		}
	}

	useEffect(() => {
		addEventListener('error', onError);
		checkEnviroment();
		return () => {
			removeEventListener('error', onError);
		};
	}, []);

	return (
		<AnimatePresence mode="wait">
			<PageWrapper>
				<Outlet />
			</PageWrapper>
			<Toaster position="bottom-center" />
			<GlobalDialog />
		</AnimatePresence>
	);
}
