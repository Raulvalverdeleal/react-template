import { cn } from '@/utils/shadcn.ts';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const tooltipVariants = cva(
	[
		// NOTE: NO 'relative' aquí — el padre debe ser relative
		'invisible absolute z-10 w-max max-w-[200px]',
		'rounded-md bg-neutral-900 px-3 py-2 text-sm text-white text-center',
		'opacity-0 transition-all duration-200 ease-out',
		'group-hover:visible group-hover:opacity-100',
		'pointer-events-none', // evita jitter mantenido sobre el tooltip
	],
	{
		variants: {
			position: {
				// Top: inicialmente desplazado hacia abajo (translate-y-2) -> en hover 0
				'top-left':
					'bottom-full left-0 mb-2 translate-y-2 group-hover:translate-y-0 after:content-[""] after:absolute after:top-full after:left-4 after:border-4 after:border-transparent after:border-t-neutral-900',
				'top-center':
					'bottom-full left-1/2 -translate-x-1/2 mb-2 translate-y-2 group-hover:translate-y-0 after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-neutral-900',
				'top-right':
					'bottom-full right-0 mb-2 translate-y-2 group-hover:translate-y-0 after:content-[""] after:absolute after:top-full after:right-4 after:border-4 after:border-transparent after:border-t-neutral-900',

				// Bottom: inicialmente desplazado hacia arriba (-translate-y-2) -> en hover 0
				'bottom-left':
					'top-full left-0 mt-2 -translate-y-2 group-hover:translate-y-0 after:content-[""] after:absolute after:bottom-full after:left-4 after:border-4 after:border-transparent after:border-b-neutral-900',
				'bottom-center':
					'top-full left-1/2 -translate-x-1/2 mt-2 -translate-y-2 group-hover:translate-y-0 after:content-[""] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-neutral-900',
				'bottom-right':
					'top-full right-0 mt-2 -translate-y-2 group-hover:translate-y-0 after:content-[""] after:absolute after:bottom-full after:right-4 after:border-4 after:border-transparent after:border-b-neutral-900',

				'center-left':
					'top-1/2 -translate-y-1/2 right-full mr-2 translate-x-2 group-hover:translate-x-0 after:content-[""] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-neutral-900',
				'center-right':
					'top-1/2 -translate-y-1/2 left-full ml-2 -translate-x-2 group-hover:translate-x-0 after:content-[""] after:absolute after:top-1/2 after:right-full after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-neutral-900',
			},
		},
		defaultVariants: {
			position: 'top-center',
		},
	}
);

export function TooltipText({
	children,
	position,
	className,
	...props
}: { position?: VariantProps<typeof tooltipVariants>['position'] } & HTMLAttributes<HTMLSpanElement>) {
	return (
		<span {...props} className={cn(tooltipVariants({ position }), className)} role="tooltip">
			{children}
		</span>
	);
}

export function TooltipContainer({ children, className, ...props }: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span className={cn('relative inline-flex items-center cursor-pointer group', className)} {...props}>
			{children}
			{/* Aquí el tooltip es absolute (padre = relative) */}
		</span>
	);
}
