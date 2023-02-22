import loadable from '@loadable/component'
const ProtectedRoute = loadable(() => import('./components/ProtectedRoute'))
const Posts = loadable(() => import('@/views/Posts/Posts'))

export const protectedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [{ path: 'posts', element: <Posts /> }],
  },
]
