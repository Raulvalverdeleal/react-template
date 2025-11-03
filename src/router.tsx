import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '@/components/pages/error-page.tsx';
import { HomePage } from '@/components/pages/home-page.tsx';
import { NotFoundPage } from '@/components/pages/not-found-page.tsx';
import { AppProvider } from '@/components/providers/app-provider.tsx';
import { ErrorBoundary } from '@/components/ui/error-boundary.tsx';
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
