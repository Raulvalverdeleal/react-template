// PageWrapper.tsx
import { useMatches } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Header, Footer, Loader } from '@components';
import { useLoading } from '@/hooks/use-loading.ts';
import { PageWrapperProps, RouteMeta } from '@types';

export function PageWrapper({ children }: PageWrapperProps) {
	const matches = useMatches();
	const loading = useLoading();

	const meta = (matches[matches.length - 1]?.handle ?? {}) as RouteMeta;
	const showHeader = !!meta.header;
	const showFooter = !!meta.footer;
	const secured = !!meta.secured;

	return (
		<>
			{showHeader && <Header />}
			<Motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.1 }}
				className={'w-full h-full'}
			>
				{(secured && true) /* required condition ex: user.authorized*/ || !secured ? (
					children
				) : (
					<Loader loading={loading.now} />
				)}
			</Motion.main>
			{showFooter && <Footer />}
		</>
	);
}
