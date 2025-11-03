import type { DialogDataMap } from '@/types/global.d.ts';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog.tsx';
import { Icon } from '../ui/Icon.tsx';
import { normalizePhoneNumber } from '@/utils/helpers.ts';
import { buttonVariants } from '@/styles/variants.ts';
import data from '@/assets/data.json' with { type: 'json' };

export function ErrorDialog({ title, message }: DialogDataMap['error']) {
	return (
		<>
			<div>
				<Icon name="error" className="text-red-400" size={30} />
			</div>
			<DialogTitle className="flex items-center space-x-2 justify-center">
				<span>{title}</span>
			</DialogTitle>
			{message ? (
				<DialogDescription className="text-center">{message}</DialogDescription>
			) : (
				<DialogDescription className="text-center sr-only">{__('no description-provided')}</DialogDescription>
			)}
			<div className="flex flex-col space-y-3 w-full items-center">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`tel:${normalizePhoneNumber(data.contact.phone)}`}
					className={buttonVariants({ size: 'lg', variant: 'outline', className: 'w-full max-w-[300px]' })}
				>
					<Icon name={'call'} />
					{__('Call')}
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://wa.me/${normalizePhoneNumber(data.contact.phone)}/?text=Hola%20necesito%20ayuda%20sobre%20mi%20reserva`}
					className={buttonVariants({ size: 'lg', variant: 'outline', className: 'w-full max-w-[300px]' })}
				>
					<Icon name={'whatsapp'} />
					{__('Whatsapp')}
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`mailto:${data.contact.email}`}
					className={buttonVariants({ size: 'lg', variant: 'outline', className: 'w-full max-w-[300px]' })}
				>
					<Icon name={'mail'} />
					{__('Email')}
				</a>
			</div>
		</>
	);
}
