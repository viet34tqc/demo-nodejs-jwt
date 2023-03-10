import { useLogout } from '@/views/AuthPages/apis/logout'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'

const UserNavigation = () => {
  const navigate = useNavigate()
  const { mutate } = useLogout()
  const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
    {
      name: 'Sign out',
      to: '',
      onClick: () => {
        mutate(null as never, {
          onSuccess: () => {
            navigate('/')
          },
        })
      },
    },
  ]
  return (
    <Menu as='div' className='ml-3 py-3 relative'>
      <Menu.Button className='max-w-xs bg-gray-200 p-2 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        <span className='sr-only'>Open user menu</span>
        <UserIcon className='h-8 w-8 rounded-full' />
      </Menu.Button>
      <Transition
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  onClick={item.onClick}
                  to={item.to}
                  className={clsx(
                    'block px-4 py-2 text-sm text-gray-700',
                    active ? 'bg-gray-100' : '',
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserNavigation
