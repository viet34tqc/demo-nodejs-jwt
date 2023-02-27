import loadable from '@loadable/component'
const ProtectedRoute = loadable(() => import('./components/ProtectedRoute'))
const Posts = loadable(() => import('@/views/Posts'))
const SinglePost = loadable(() => import('@/views/SinglePost'))

export const protectedRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:id', element: <SinglePost /> },
    ],
  },
]
