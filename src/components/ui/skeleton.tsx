import { cn } from '@utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div data-slot="skeleton" className={cn('animate-pulse rounded-md bg-blue-40 w-full', className)} {...props} />
	);
}

export { Skeleton };
