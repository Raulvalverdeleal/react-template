// PageWrapper.tsx
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Header } from '@/components/layout/header.tsx';
import { Footer } from '@/components/layout/footer.tsx';
import { Loader } from '@/components/ui/loader.tsx';
import { GlobalDialog } from '@/components/ui/global-dialog.tsx';
import { useLoading } from '@/hooks/use-loading.ts';
import { Toaster } from 'sonner';

type RouteMeta = Partial<{
	header: boolean;
	footer: boolean;
	secured: boolean;
	redirectTo: string;
}>;

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
					className="inside-wrapper"
				>
					<div className="inside">
						{(secured && true) /* required condition ex: user.token*/ || !secured ? (
							<Outlet />
						) : (
							//You may want to redirec`t to an unsecured page here
							//example: <Navigate to="/login" />
							<Loader loading={loading.now} />
						)}
					</div>
				</Motion.main>
			</AnimatePresence>
			<Toaster position="top-right" expand closeButton richColors />
			<GlobalDialog />
			{showFooter && <Footer />}
		</>
	);
}
