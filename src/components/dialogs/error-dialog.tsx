import { DialogDataMap } from '@types';
import { Button, DialogDescription, DialogTitle } from '@components';
import { __ } from '@utils';
import { useDialog } from '@hooks';

export function ErrorDialog({ title, message }: DialogDataMap['error']) {
	const dialog = useDialog();
	return (
		<>
			<DialogTitle className="flex items-center space-x-2 justify-center">
				<span>{title}</span>
			</DialogTitle>
			<DialogDescription className="text-center">{message}</DialogDescription>
			<Button onClick={() => dialog.close()}>{__('Understood')}</Button>
		</>
	);
}
