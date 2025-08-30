import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ErrorPage, NotFoundPage, AppProvider } from '@components';
import { App } from './app.tsx';

export const router = createBrowserRouter([
	{
		element: (
			<AppProvider>
				<App />
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
