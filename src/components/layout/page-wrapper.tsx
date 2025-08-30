// PageWrapper.tsx
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Header, Footer, Loader, GlobalDialog } from '@components';
import { useLoading } from '@/hooks/use-loading.ts';
import { RouteMeta } from '@types';
import { Toaster } from 'sonner';

export function PageWrapper() {
	const matches = useMatches();
	const loading = useLoading();
	const location = useLocation();

	const meta = (matches[matches.length - 1]?.handle ?? {}) as RouteMeta;
	const showHeader = !!meta.header;
	const showFooter = !!meta.footer;
	const secured = !!meta.secured;

	return (
		<>
			{showHeader && <Header />}
			<AnimatePresence mode="wait" key={location.pathname}>
				<Motion.main
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1 }}
					className={'w-full h-full'}
				>
					{(secured && true) /* required condition ex: user.token*/ || !secured ? (
						<Outlet />
					) : (
						<Loader loading={loading.now} />
					)}
				</Motion.main>
			</AnimatePresence>
			<Toaster position="bottom-center" />
			<GlobalDialog />
			{showFooter && <Footer />}
		</>
	);
}
