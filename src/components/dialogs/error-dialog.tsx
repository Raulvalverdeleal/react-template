import { DialogDataMap } from '@types';
import { Button, DialogDescription, DialogTitle } from '@components';
import { useDialog, useTranslator } from '@hooks';

export function ErrorDialog({ title, message }: DialogDataMap['error']) {
	const dialog = useDialog();
	const __ = useTranslator();
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
