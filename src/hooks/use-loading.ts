import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { __ } from '@utils';

export function useLoading() {
	const [loading, setLoading] = useState(0);
	const toastIds = useRef<Set<string | number>>(new Set());
	const last = useRef(0);

	function handleLoad() {
		if (loading && last.current === 0) {
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
	}, [loading]); //eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		return () => {
			dismissAll();
		};
	}, []);

	return {
		start: () => setLoading((x) => x + 1),
		end: () => setLoading((x) => Math.max(0, x - 1)),
		now: loading !== 0,
	};
}
