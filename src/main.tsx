import { createRoot } from 'react-dom/client';
import '@styles';
import { AppProvider } from './components/index.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Root not found');
}

createRoot(root).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
