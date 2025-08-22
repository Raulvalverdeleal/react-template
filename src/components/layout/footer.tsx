import { useEffect } from 'react';
import { Icon } from '../ui/Icon.tsx';
import { config } from '@/assets/index.ts';

export function Footer() {
	useEffect(() => {
		document.body.classList.add('has-footer');
		return () => document.body.classList.remove('has-footer');
	}, []);
	return (
		<footer className="inside-wrapper bg-neutral-900 text-white">
			<div className="inside justify-end space-x-2">
				<a href={config.social.instagram} target="_blank" rel="noopener noreferrer">
					<Icon name={'instagram'} />
				</a>
				<a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
					<Icon name={'linkedin'} />
				</a>
				<a href={config.social.github} target="_blank" rel="noopener noreferrer">
					<Icon name={'github'} />
				</a>
			</div>
		</footer>
	);
}
