import clsx from 'clsx'
import { ComponentProps, PropsWithChildren } from 'react'

const FormControl = ({
  children,
  className = '',
  ...props
}: PropsWithChildren<ComponentProps<'div'> & { className?: string }>) => {
  return (
    <div className={clsx('grid gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export default FormControl
