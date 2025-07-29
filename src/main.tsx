import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@components';
import { App } from '@/app.tsx';
import { createRoot } from 'react-dom/client';
import '@styles';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Root not found');
}

createRoot(root).render(
	<AppProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AppProvider>
);
