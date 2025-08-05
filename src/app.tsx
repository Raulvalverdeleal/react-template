import { Routes as RoutesContainer, Route, useLocation } from 'react-router-dom';
import { PageWrapper, HomePage, GlobalDialog, ErrorBoundary, ErrorPage } from '@components';
import { Routes } from '@utils';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';

export function ReactTemplate() {
	const location = useLocation();

	return (
		<>
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
		</>
	);
}

export function App() {
	return (
		<ErrorBoundary fallback={<ErrorPage />}>
			<ReactTemplate />
		</ErrorBoundary>
	);
}
