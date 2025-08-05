/**
 * type <ComponentName>Props = {...}
 */
import { IconName } from '@types';
import { ReactNode } from 'react';

export type AppProviderProps = {
	children: ReactNode;
};

export type PageWrapperProps = {
	secured?: boolean;
	children?: ReactNode;
};

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'name'> & {
	name: IconName;
	size?: number;
};

export type ComboboxProps = {
	onValueChange: (value: string) => void;
	value: string;
	placeholder: string;
	options: Option[];
	searchFallback: string;
	disabled?: boolean;
};

export type CalendarRootProps = React.HTMLAttributes<HTMLDivElement> & {
	rootRef?: React.Ref<HTMLDivElement>;
};

export type CalendarChevronProps = React.HTMLAttributes<SVGElement> & {
	orientation?: 'up' | 'down' | 'left' | 'right';
};

export type FormStepControlsProps = {
	steps: FormStep[];
	current: number;
	disabled: ((order: number) => boolean)[];
	onStepClick: (step: number) => unknown;
};

export type LoaderProps = { loading: boolean };
