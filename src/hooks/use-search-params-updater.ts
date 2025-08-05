import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
// updates search params preserving the existing ones
export function useSearchParamsUpdater(init?: URLSearchParamsInit) {
	const [params, setParams] = useSearchParams(init);

	const set = (data: string[][] | Record<string, string> | string | URLSearchParams) => {
		setParams((prev) => {
			const prevParams = new URLSearchParams(prev);
			const newParams = new URLSearchParams(data);
			const mergedParams = new URLSearchParams(prevParams.toString());

			for (const [key, value] of newParams.entries()) {
				if (value) {
					mergedParams.set(key, value);
				} else {
					mergedParams.delete(key);
				}
			}

			return mergedParams;
		});
	};

	return [params, set] as const;
}
