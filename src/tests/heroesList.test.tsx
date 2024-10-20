import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeroesList from '../components/organisms/CharacterList';

const queryClient = new QueryClient();

test('renders loading state correctly', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <HeroesList />
    </QueryClientProvider>
  );
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('displays fetched data correctly', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <HeroesList />
    </QueryClientProvider>
  );
  
  await screen.findByText(/Items List/i);
});
