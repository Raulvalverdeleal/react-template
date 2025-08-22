import { config } from '@/assets/index.ts';
import { useTranslator } from '@/hooks/use-translator.ts';
import { buttonVariants } from '@/styles/variants.ts';
import { Icon } from '@components';
import { normalizePhoneNumber } from '@utils';

export function ErrorPage() {
	const __ = useTranslator();
	return (
		<div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-6 my-auto">
			<Icon name="error" size={40} className="text-destructive" />
			<h1 className="text-3xl font-semibold text-gray-800">{__('Oops! Something went wrong.')}</h1>
			<p className="text-gray-600 text-sm max-w-xs">{__('Please contact us for more information.')}</p>
			<div className="flex flex-col space-y-3 w-full max-w-[300px]">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`tel:${normalizePhoneNumber(config.contact.phone)}`}
					className={buttonVariants({ size: 'lg', variant: 'outline' })}
				>
					<Icon name={'call'} />
					{__('Call')}
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://wa.me/${normalizePhoneNumber(config.contact.phone)}/?text=Hola%20necesito%20ayuda%20sobre%20mi%20reserva`}
					className={buttonVariants({ size: 'lg', variant: 'outline' })}
				>
					<Icon name={'whatsapp'} />
					{__('Whatsapp')}
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`mailto:${config.contact.email}`}
					className={buttonVariants({ size: 'lg', variant: 'outline' })}
				>
					<Icon name={'mail'} />
					{__('Email')}
				</a>
			</div>
		</div>
	);
}
