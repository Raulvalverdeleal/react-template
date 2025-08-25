import { useTranslator } from '@hooks';
import { Button } from '@components';

export function HomePage() {
	const __ = useTranslator();
	return (
		<div className="h-full overflow-scroll inside-wrapper">
			<div className="inside p-4 flex-col space-y-5">
				<h1>{__('React template')}</h1>
				<Button
					variant={'destructive'}
					onClick={() => {
						throw new Error('message');
					}}
				>
					{__('Throw error')}
				</Button>
			</div>
		</div>
	);
}
