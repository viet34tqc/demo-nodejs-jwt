import { useAuth } from '@/core/context/AuthContext'
import ProtectedLayout from '@/core/layouts/ProtectedLayout/ProtectedLayout'
import ProfileForm from './components/ProfileForm'

const ProfileRow = ({ name, value }: { name: string; value: string | undefined }) => {
  return (
    <div className='child:text-sm child:text-gray-500 grid grid-cols-[1fr,2fr] py-6 border-t-gray-300 border-t'>
      <span className='font-medium'>{name}</span>
      <span>{value}</span>
    </div>
  )
}

const Profile = () => {
  const { user } = useAuth()
  return (
    <ProtectedLayout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-xl font-bold'>Profile</h1>
        <ProfileForm />
      </div>
      <div>
        <ProfileRow name='Name' value={user?.name} />
        <ProfileRow name='Email' value={user?.email} />
        <ProfileRow name='Role' value={user?.role} />
      </div>
    </ProtectedLayout>
  )
}

export default Profile
