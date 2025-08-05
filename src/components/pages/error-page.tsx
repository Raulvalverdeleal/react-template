import { data } from '@/assets/index.ts';
import { buttonVariants } from '@/styles/variants.ts';
import { Icon } from '@components';
import { __, normalizePhoneNumber } from '@utils';
import { Link } from 'react-router-dom';

export function ErrorPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-6 my-auto">
			<Icon name="error" size={40} className="text-red-400" />
			<h1 className="text-3xl font-semibold text-gray-800">{__('Oops! Something went wrong.')}</h1>
			<p className="text-gray-600 text-sm max-w-xs">{__('Please contact us for more information.')}</p>
			<div className="flex flex-col space-y-3 w-full max-w-[300px]">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to={`tel:${normalizePhoneNumber(data.contact.phone)}`}
					className={buttonVariants({ size: 'lg' })}
				>
					<Icon name={'call'} />
					{__('Call')}
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to={`https://wa.me/${normalizePhoneNumber(data.contact.phone)}/?text=Hola%20necesito%20ayuda%20sobre%20mi%20reserva`}
					className={buttonVariants({ size: 'lg' })}
				>
					<Icon name={'whatsapp'} />
					{__('Whatsapp')}
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to={`mailto:${data.contact.email}`}
					className={buttonVariants({ size: 'lg' })}
				>
					<Icon name={'mail'} />
					{__('Email')}
				</Link>
			</div>
		</div>
	);
}
