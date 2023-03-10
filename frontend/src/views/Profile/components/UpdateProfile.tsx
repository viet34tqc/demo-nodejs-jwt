import { Button } from '@/core/components/ui/Button'
import loadable from '@loadable/component'
import { useState } from 'react'
const UpdateProfileModal = loadable(() => import('./UpdateProfileModal'))

const UpdateProfile = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Update profile</Button>
      {isOpen && <UpdateProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default UpdateProfile
