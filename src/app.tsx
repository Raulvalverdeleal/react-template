import { Routes as RoutesContainer, Route, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, HomePage, GlobalDialog, ErrorBoundary, ErrorPage } from '@components';
import { domain, enviroment, Enviroments, Routes } from '@utils';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export function App() {
	const location = useLocation();
	const navigate = useNavigate();

	function checkEnviroment() {
		// if you've deployed to production with pre / local enviroment,
		// this will catch the issue, handle as you want, email notification, sentry, etc.
		if (enviroment !== Enviroments.PRO && window.location.host === domain) {
			navigate(Routes.ERROR);
		}
	}

	useEffect(() => {
		window.onunhandledrejection = (event) => {
			console.error('Unhandled rejection:', event.reason);
			navigate(Routes.ERROR);
		};
		checkEnviroment();
		return () => {
			window.onunhandledrejection = null;
		};
	}, []);

	return (
		<ErrorBoundary fallback={<ErrorPage />}>
			<AnimatePresence mode="wait">
				<RoutesContainer key={location.pathname} location={location}>
					<Route
						path={Routes.HOME}
						element={
							<PageWrapper>
								<HomePage />
							</PageWrapper>
						}
					/>
					<Route
						path={Routes.ERROR}
						element={
							<PageWrapper>
								<ErrorPage />
							</PageWrapper>
						}
					/>
				</RoutesContainer>
			</AnimatePresence>
			<Toaster position="bottom-center" />
			<GlobalDialog />
		</ErrorBoundary>
	);
}
