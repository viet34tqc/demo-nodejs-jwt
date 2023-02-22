import loadable from '@loadable/component'
const Page404 = loadable(() => import('@/views/Page404/Page404'))

export const publicRoutes = [{ path: '*', element: <Page404 /> }]
