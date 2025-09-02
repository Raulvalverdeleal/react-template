import { Button, Icon } from '@components';
import type { IconName } from '@types';
import { Fragment } from 'react';

type FormStepControlsProps = {
	steps: IconName[];
	current: number;
	disabled: ((order: number) => boolean)[];
	onStepClick: (step: number) => unknown;
};

export function FormStepControls({ steps, current, onStepClick, disabled }: FormStepControlsProps) {
	return (
		<div className="flex items-center justify-between gap-2 mt-5 w-full">
			{steps.map((step, index) => {
				const isDisabled = disabled.some((condition) => condition(index));
				const isCurrent = current === index;

				return (
					<Fragment key={index}>
						{index > 0 && (
							<div
								className={`w-full h-[2px] rounded ${!isDisabled ? 'bg-neutral-900' : 'bg-gray-300'}`}
							/>
						)}
						<div className="flex items-center">
							<Button
								type="button"
								disabled={isDisabled}
								onClick={() => onStepClick(index)}
								variant={isCurrent ? 'default' : 'outline'}
								className={`
								${!isCurrent && !isDisabled ? '!border-neutral-900' : ''}
								${!isCurrent ? 'border-2' : ''}
								size-10 flex items-center justify-center rounded-full 
							`}
							>
								<Icon name={step} />
							</Button>
						</div>
					</Fragment>
				);
			})}
		</div>
	);
}
