import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import HeroesList from './components/organisms/HeroesList';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App container mx-auto">
    <QueryClientProvider client={queryClient}>
      <HeroesList />
    </QueryClientProvider>
    </div>
  );
}

export default App;
