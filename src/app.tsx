import { useLocation, useNavigate } from 'react-router-dom';
import { config, Enviroments } from '@utils';
import { PageWrapper } from '@components';
import { useEffect } from 'react';

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

		if (config.enviroment !== Enviroments.PRO && !isLocalhost && !isPreproduction) {
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

	return <PageWrapper />;
}
