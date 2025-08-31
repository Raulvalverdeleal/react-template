import { DialogData } from '@types';
import { useApp } from '@hooks';

export function useDialog() {
	const { dialogData, setDialogData } = useApp();
	return {
		open(data: DialogData) {
			setDialogData(data);
		},
		close() {
			setDialogData(null);
		},
		currentView: dialogData?.view ?? null,
	};
}
