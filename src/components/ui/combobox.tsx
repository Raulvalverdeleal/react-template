'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@utils';
import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@components';

export type ComboboxProps = {
	onValueChange: (value: string) => void;
	value: string;
	placeholder: string;
	options: { value: string; name: string }[];
	searchFallback: string;
	disabled?: boolean;
};

export function Combobox({ onValueChange, value, placeholder, options, searchFallback, disabled }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild disabled={disabled} className="w-[200px]">
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between text-white"
				>
					<p className="w-full text-ellipsis overflow-hidden">
						{value ? options.find((framework) => framework.value === value)?.name : placeholder || ''}
					</p>
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={placeholder} className="h-9" />
					<CommandList>
						<CommandEmpty>{searchFallback}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									keywords={[option.name]}
									onSelect={(currentValue) => {
										onValueChange(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									{option.name}
									<Check
										className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
