import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useApp, useTranslator } from '@hooks';

export function useLoading(options?: { showToast: boolean }) {
	const { loading, setLoading } = useApp();
	const __ = useTranslator();
	const toastIds = useRef<Set<string | number>>(new Set());
	const last = useRef(0);

	function handleLoad() {
		if (loading && last.current === 0 && options?.showToast) {
			toastIds.current.add(toast.loading(__('Loading...')));
		}
		if (loading === 0) {
			dismissAll();
		}
	}

	function dismissAll() {
		toastIds.current.forEach((id) => toast.dismiss(id));
	}

	useEffect(() => {
		handleLoad();
		last.current = loading;
	}, [loading]);

	useEffect(() => {
		return () => {
			dismissAll();
		};
	}, []);

	return {
		start: () => setLoading((x: number) => x + 1),
		end: () => setLoading((x: number) => Math.max(0, x - 1)),
		now: loading !== 0,
	};
}
