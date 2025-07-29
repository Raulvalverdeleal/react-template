import { Routes as RoutesContainer, Route, useLocation } from 'react-router-dom';
import { PageWrapper, HomePage, GlobalDialog } from '@components';
import { Routes } from '@utils';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';

export function App() {
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
				</RoutesContainer>
			</AnimatePresence>
			<Toaster position="bottom-center" />
			<GlobalDialog />
		</>
	);
}
