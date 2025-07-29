import { useLocation, useNavigate } from 'react-router-dom';
import { securedPages, Routes } from '@utils';
import { user } from '@core';
import { useEffect, useMemo } from 'react';
import { PageMotion, PageWrapperProps, RoutesValue } from '@types';
import { motion as Motion } from 'framer-motion';
import { useApp } from '@hooks';

export function PageWrapper({ children }: PageWrapperProps) {
	const { lastPage } = useApp();

	const location = useLocation();
	const navigate = useNavigate();

	const page = useMemo(() => {
		const pathName = location.pathname as RoutesValue;
		const motion: PageMotion =
			lastPage.current !== pathName
				? {
						initial: { opacity: 0 },
						animate: { opacity: 1, x: 0 },
						exit: { opacity: 0 },
						transition: { duration: 0.1 },
					}
				: {};

		return {
			pathName,
			motion,
			name: location.pathname.substring(1),
			isAuthorized: user.token || !securedPages.includes(pathName),
		};
	}, [location.pathname, user.token]); //eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!page.isAuthorized) {
			console.warn(`Unauthorized user for ${location.pathname}`);
			navigate(Routes.HOME);
			// navigate(Routes.LOGIN)
		}

		document.body.setAttribute('data-page', page.name);

		return () => {
			document.body.removeAttribute('data-page');
			lastPage.current = page.pathName;
		};
	}, [location, user.token]); //eslint-disable-line react-hooks/exhaustive-deps

	return page.isAuthorized ? (
		<Motion.main id={page.name} {...page.motion}>
			{children}
		</Motion.main>
	) : null;
}
