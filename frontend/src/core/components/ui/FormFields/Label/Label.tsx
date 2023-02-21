import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

const Label = ({
  children,
  htmlFor,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<'label'>>) => {
  return (
    <label className='mb-1 block text-sm text-gray-700 font-medium' htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
}

export default Label
