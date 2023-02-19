import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = ComponentPropsWithoutRef<'select'> & {
	options: Record<'value' | 'label', string>[];
	registration: Partial<UseFormRegisterReturn>;
};

const SelectField = ({ options, className, registration, ...props }: Props) => {
	return (
		<select
			{...props}
			className={clsx(
				'flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
				className
			)}
			{...registration}
		>
			{options.map(option => (
				<option value={option.value} key={option.value} className="text-black">
					{option.label}
				</option>
			))}
		</select>
	);
};

export default SelectField;
