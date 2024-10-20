import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharactersList from '../components/organisms/CharacterList';
import { fetchMultipleItems } from '../lib/fetch';


//creating test query
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });
//creating mock for fetch
jest.mock('../lib/fetch', () => ({
  fetchMultipleItems: jest.fn(),
}));

test('renders loading state correctly', () => {
  (fetchMultipleItems as jest.Mock).mockResolvedValueOnce({
    results: [{ name: 'Luke Skywalker', films: [1] }],
    next: null,
  });

  const queryClient = createTestQueryClient();
  
  render(
    <QueryClientProvider client={queryClient}>
      <CharactersList />
    </QueryClientProvider>
  );
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('displays fetched data correctly', async () => {
  (fetchMultipleItems as jest.Mock).mockResolvedValueOnce({
    results: [{ name: 'Luke Skywalker', films: [1] }],
    next: null,
  });

  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <CharactersList />
    </QueryClientProvider>
  );
  
  expect(await screen.findByText(/Items List/i)).toBeInTheDocument();
});
