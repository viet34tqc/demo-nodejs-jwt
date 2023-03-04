import loadable from '@loadable/component'
const ProtectedRoute = loadable(() => import('./components/ProtectedRoute'))
const Posts = loadable(() => import('@/views/SinglePost/components'))
const SinglePost = loadable(() => import('@/views/SinglePost'))
const Profile = loadable(() => import('@/views/Profile'))

export const protectedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:id', element: <SinglePost /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]
