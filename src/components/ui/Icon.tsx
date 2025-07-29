import type { IconProps } from '@types';
import { icons } from '@assets';

export function Icon({ name, size = 24, ...attributes }: IconProps) {
	return (
		<span {...attributes} className={`flex items-center  justify-center ${attributes.className || ''}`}>
			<svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" className={`size-[${size}px]`}>
				<use href={`${icons}#${name}`} />
			</svg>
		</span>
	);
}
