import { LoaderProps } from '@/types/components.js';
import { Loader2Icon } from 'lucide-react';

export function Loader({ loading }: LoaderProps) {
	return (
		<div
			className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white transition-all duration-200  opacity-100 ${loading ? '' : '!opacity-0 pointer-events-none'}`}
		>
			<Loader2Icon className="animate-spin" />
		</div>
	);
}
