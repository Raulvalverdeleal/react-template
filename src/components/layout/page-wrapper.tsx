import { Outlet, useNavigate } from 'react-router-dom';
import { Routes, Enviroment, Enviroments } from '@utils';
import { useEffect } from 'react';
import { PageWrapperProps } from '@types';
import { motion as Motion } from 'framer-motion';
import { useLoading } from '@hooks';
import { Card } from '../ui/card.tsx';
import { Loader } from '../ui/loader.tsx';
import { GlobalDialog } from '../ui/global-dialog.tsx';

export function PageWrapper({ children, secured }: PageWrapperProps) {
	const loading = useLoading();
	const navigate = useNavigate();

	useEffect(() => {
		window.onunhandledrejection = (event) => {
			console.error('Unhandled rejection:', event.reason);
			navigate(Routes.ERROR);
		};
		return () => {
			window.onunhandledrejection = null;
		};
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Motion.main
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.1 }}
			className={`${Enviroment === Enviroments.PRO ? 'w-full h-full' : 'p-5 h-[600px] w-[450px]'} relative`}
		>
			<Card className="w-full h-full min-h-[500px] min-w-[400px] overflow-scroll flex flex-col items-center justify-between gap-0 relative p-5 overflow-x-visible">
				{(secured && true) /* required condition ex: user.authorized*/ || !secured ? (
					<>
						{children}
						<Outlet />
					</>
				) : (
					<Loader loading={loading.now} />
				)}
				<GlobalDialog />
			</Card>
		</Motion.main>
	);
}
