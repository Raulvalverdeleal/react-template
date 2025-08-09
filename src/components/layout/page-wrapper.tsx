import { Outlet } from 'react-router-dom';
import { PageWrapperProps } from '@types';
import { motion as Motion } from 'framer-motion';
import { useLoading } from '@hooks';
import { Card } from '../ui/card.tsx';
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
			<Card className="w-full h-full min-h-[500px] min-w-[400px] overflow-scroll flex flex-col items-center justify-between gap-0 relative p-5 overflow-x-visible">
				{(secured && true) /* required condition ex: user.authorized*/ || !secured ? (
					<>
						{children}
						<Outlet />
					</>
				) : (
					<Loader loading={loading.now} />
				)}
			</Card>
		</Motion.main>
	);
}
