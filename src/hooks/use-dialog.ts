import type { DialogData } from '@/types/global.d.ts';
import { useApp } from '@/hooks/use-app.ts';

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
