import { Dialog, Transition } from '@headlessui/react'
import { cloneElement, Dispatch, Fragment, ReactElement } from 'react'

// isOpen and setIsOpen should be put outside of this child component for more control
// Parent component should contain only Modal component for better performance.
// You can only set it here if children props is a React component
type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
  title: string
  triggerButton: ReactElement
  children: ReactElement // use ReactElement here because cloneElement doesn't accept ReactNode
}

const Modal = ({ isOpen, setIsOpen, title, triggerButton, children }: Props) => {
  return (
    <>
      {cloneElement(triggerButton, { onClick: () => setIsOpen(true) })}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h2'
                    className='text-lg font-medium leading-6 text-gray-900 mb-4'
                  >
                    {title}
                  </Dialog.Title>

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
