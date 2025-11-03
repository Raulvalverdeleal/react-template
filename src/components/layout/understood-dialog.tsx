import type { DialogDataMap } from '@/types/global.d.ts';
import { Button } from '@/components/ui/button.tsx';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog.tsx';
import { useDialog } from '@/hooks/use-dialog.ts';

export function UnderstoodDialog({ title, message }: DialogDataMap['understood']) {
	const dialog = useDialog();
	return (
		<>
			<DialogTitle className="flex items-center space-x-2 justify-center">
				<span>{title}</span>
			</DialogTitle>
			{message ? (
				<DialogDescription className="text-center">{message}</DialogDescription>
			) : (
				<DialogDescription className="text-center sr-only">{__('no description-provided')}</DialogDescription>
			)}
			<Button onClick={() => dialog.close()}>{__('Understood')}</Button>
		</>
	);
}
