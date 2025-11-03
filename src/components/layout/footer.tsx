import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon.tsx';
import data from '@/assets/data.json' with { type: 'json' };

export function Footer() {
	useEffect(() => {
		document.body.classList.add('has-footer');
		return () => document.body.classList.remove('has-footer');
	}, []);
	return (
		<footer className="inside-wrapper bg-neutral-900 text-white">
			<div className="inside flex justify-end space-x-2 py-2">
				<a href={data.social.instagram} target="_blank" rel="noopener noreferrer">
					<Icon name={'instagram'} />
				</a>
				<a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">
					<Icon name={'linkedin'} />
				</a>
				<a href={data.social.github} target="_blank" rel="noopener noreferrer">
					<Icon name={'github'} />
				</a>
			</div>
		</footer>
	);
}
