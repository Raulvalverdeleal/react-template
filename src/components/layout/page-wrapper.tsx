import { Outlet } from 'react-router-dom';
import { PageWrapperProps } from '@types';
import { motion as Motion } from 'framer-motion';
import { useLoading } from '@hooks';
import { Loader } from '../ui/loader.tsx';

export function PageWrapper({ children, secured }: PageWrapperProps) {
	const loading = useLoading();

	return (
		<Motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.1 }}
			className={'w-full h-full'}
		>
			{(secured && true) /* required condition ex: user.authorized*/ || !secured ? (
				<>
					{children}
					<Outlet />
				</>
			) : (
				<Loader loading={loading.now} />
			)}
		</Motion.main>
	);
}
