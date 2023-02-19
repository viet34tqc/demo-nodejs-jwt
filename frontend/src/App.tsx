import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './core/context/AuthContext';
import { Login } from './views/AuthPages/Login';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 20 * 1000, // 20s
		},
	},
});

function App() {
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<BrowserRouter>
						<Login />
					</BrowserRouter>
				</AuthContextProvider>
			</QueryClientProvider>
		</div>
	);
}

export default App;
