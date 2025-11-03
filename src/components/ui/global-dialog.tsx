import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useApp } from '@/hooks/use-app.ts';
import { DialogPortal, DialogOverlay, DialogClose } from '@/components/ui/dialog.tsx';
import { ErrorDialog } from '@/components/layout/error-dialog.tsx';
import { useDialog } from '@/hooks/use-dialog.ts';
import { UnderstoodDialog } from '../layout/understood-dialog.tsx';

export function GlobalDialog({
	...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Root>, 'children' | 'open'>) {
	const { dialogData } = useApp();
	const dialog = useDialog();

	return (
		<DialogPrimitive.Root {...props} data-slot="dialog" open={!!dialogData}>
			<DialogPortal data-slot="dialog-portal">
				<DialogOverlay />
				<DialogPrimitive.Content
					data-slot="dialog-content"
					className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg"
					{...props}
				>
					{dialogData?.view === 'error' ? (
						<ErrorDialog {...dialogData} />
					) : dialogData?.view === 'understood' ? (
						<UnderstoodDialog {...dialogData} />
					) : null}
					{dialogData?.showCloseButton && (
						<DialogClose
							data-slot="dialog-close"
							className="cursor-pointer ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
							onClick={() => dialog.close()}
						>
							<XIcon />
							<span className="sr-only">{__('Close')}</span>
						</DialogClose>
					)}
				</DialogPrimitive.Content>
			</DialogPortal>
		</DialogPrimitive.Root>
	);
}
