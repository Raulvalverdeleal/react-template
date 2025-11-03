import type { IconName } from '@/types/global.d.ts';
import icons from '@/assets/icons.svg';

type IconProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'name'> & {
	name: IconName;
	size?: number;
};

export function Icon({ name, size = 24, ...attributes }: IconProps) {
	return (
		<span {...attributes} className={`flex items-center  justify-center ${attributes.className || ''}`}>
			<svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" className={`size-[${size}px]`}>
				<use href={`${icons}#${name}`} />
			</svg>
		</span>
	);
}
