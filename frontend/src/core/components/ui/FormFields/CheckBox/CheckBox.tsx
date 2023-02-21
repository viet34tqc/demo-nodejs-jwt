import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'input'>

const Checkbox = forwardRef<HTMLInputElement, Props>(({ className = '', ...props }, ref) => {
  return (
    <input
      type='checkbox'
      className={clsx(
        'flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
