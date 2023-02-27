import clsx from 'clsx'
import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'
import { Link, LinkProps } from 'react-router-dom'

// Here is tailwind class for variants
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600',
  secondary: 'bg-gray-200 text-black-300 hover:bg-blue-600:text-white',
}

type BaseProps = {
  variant?: keyof typeof variants
}

type ButtonOrAnchorProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  LinkHTMLAttributes<HTMLLinkElement>

type ButtonAsRouterLink = BaseProps & LinkProps

type ButtonProps = ButtonAsRouterLink | ButtonOrAnchorProps

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  const newProps = { ...props }
  // Here you can add style from tailwind, below is the demo
  const className = clsx(
    'flex items-center justify-center px-4 py-2 rounded font-medium focus:outline-none',
    variants[variant],
    props.className,
  )
  newProps.className = className
  if ('to' in newProps) {
    return <Link {...newProps} />
  }
  let As = 'button'

  // If you are using NextJs
  /* if (props.href) {
		return (
			<Link href={props.href}>
				<As className={className} {...newProps} />
			</Link>
		);
	} */
  if (newProps.href) {
    As = 'a'
  }
  if (As === 'button') {
    newProps['type'] = newProps.type ? newProps.type : 'button'
  }

  return <As {...newProps} />
}

export default Button
