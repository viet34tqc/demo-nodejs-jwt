import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import AuthContextProvider from './core/context/AuthContext'
import { router } from './core/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000, // 20s
    },
  },
})

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster position='top-right' />
    </>
  )
}

export default App
