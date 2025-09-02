import { useTranslator } from '@hooks';
import { Button } from '@components';

export function HomePage() {
	const __ = useTranslator();
	return (
		<div className="inside p-4 flex-col space-y-5">
			<h1>{__('Hello world!')}</h1>
			<div className="grid grid-cols-2 gap-5">
				<Button
					variant={'destructive'}
					onClick={() => {
						throw new Error('message');
					}}
				>
					{__('Throw unexpected error')}
				</Button>
			</div>
		</div>
	);
}
