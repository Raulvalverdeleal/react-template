import { useTranslator } from '@/hooks/use-translator.ts';
import { Icon } from '@components';

export function NotFoundPage() {
	const __ = useTranslator();
	return (
		<div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-6 my-auto">
			<Icon name="not-found" size={40} className="text-destructive" />
			<h1 className="text-3xl font-semibold text-gray-800">{__('Error 404')}</h1>
			<p className="text-gray-600 text-sm max-w-xs">
				{__('The page you are looking for does not exist. Please contact us for more information.')}
			</p>
		</div>
	);
}
