import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import CharactersList from './components/organisms/CharacterList';

const queryClient = new QueryClient();

/* 
  This is App component
  QueryClientProvider used to make use of React-Query inside component CharactersList possible
*/

function App() {
  return (
    <div className="App container mx-auto">
    <QueryClientProvider client={queryClient}>
      <CharactersList />
    </QueryClientProvider>
    </div>
  );
}

export default App;
