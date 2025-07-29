import { useDialog } from '@/hooks/use-dialog.ts';
import { __ } from '@utils';
import { useEffect } from 'react';

export function HomePage() {
	const dialog = useDialog();

	useEffect(() => {
		dialog.open({
			view: 'error',
			title: __('Sample error pop up'),
			message: __('Some error has occurred, please try again.'),
		});
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="h-full overflow-scroll inside-wrapper">
			<div className="inside p-4">
				<h1>{__('React template')}</h1>
			</div>
		</div>
	);
}
