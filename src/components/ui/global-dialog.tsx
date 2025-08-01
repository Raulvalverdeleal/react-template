import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { __, cn } from '@utils';
import { useApp } from '@hooks';
import { ErrorDialog, DialogPortal, DialogOverlay, DialogClose } from '@components';
import { useDialog } from '@hooks';

export function GlobalDialog({
	...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Root>, 'children' | 'open'>) {
	const { dialogData } = useApp();

	return (
		<DialogPrimitive.Root {...props} data-slot="dialog" open={!!dialogData}>
			<GlobalDialogContent className={dialogData?.className ?? ''}>
				{dialogData && (dialogData.view === 'error' ? <ErrorDialog {...dialogData} /> : null)}
			</GlobalDialogContent>
		</DialogPrimitive.Root>
	);
}

function GlobalDialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean;
}) {
	const dialog = useDialog();
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
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
	);
}
