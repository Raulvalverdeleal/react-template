import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ErrorPage, NotFoundPage, AppProvider, ErrorBoundary } from '@components';
import { App } from './app.tsx';

export const router = createBrowserRouter([
	{
		element: (
			<AppProvider>
				<ErrorBoundary fallback={<ErrorPage />}>
					<App />
				</ErrorBoundary>
			</AppProvider>
		),
		children: [
			{
				index: true,
				element: <HomePage />,
				handle: { header: true, footer: true, secured: false },
			},
			{
				path: '/error',
				element: <ErrorPage />,
				handle: { header: false, footer: false, secured: false },
			},
			{
				path: '*',
				element: <NotFoundPage />,
				handle: { header: true, footer: true, secured: false },
			},
		],
	},
]);
