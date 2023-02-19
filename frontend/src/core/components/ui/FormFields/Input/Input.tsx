import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type Props = ComponentPropsWithoutRef<'input'>;

const InputField2 = forwardRef<HTMLInputElement, Props>(
	({ type = 'text', className = '', ...props }, ref) => {
		return (
			<input
				className={clsx(
					'flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				type={type}
				{...props}
			/>
		);
	}
);

InputField2.displayName = 'InputField2';

export default InputField2;
