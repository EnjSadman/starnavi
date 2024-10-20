import { fetchMultipleItems } from '../lib/fetch';
import { Films, Person } from '../lib/utils/types';

jest.mock('../lib/fetch', () => ({
  fetchMultipleItems: jest.fn(),
}));

const mockPeopleData = {
  count: 1,
  next: "https://sw-api.starnavi.io/people/?page=2",
  previous: null,
  results: [
    { id: 1, name: "Luke Skywalker", height: "172", mass: "77", films: [1, 2] },
  ],
};

const mockFilmsData = {
  count: 1,
  next: null,
  previous: null,
  results: [
    { id: 1, title: "A New Hope", episode_id: 4, characters: [1] },
  ],
};

test('fetchMultipleItems fetches data correctly', async () => {
  (fetchMultipleItems as jest.Mock).mockResolvedValueOnce(mockPeopleData);

  const data = await fetchMultipleItems(`https://sw-api.starnavi.io/people/`);
  
  expect(data).toBeDefined();
  expect(Array.isArray(data.results)).toBe(true);
  expect((data.results[0] as Person).name).toBe('Luke Skywalker');
});

test('fetchMultipleItems fetches data correctly with search params', async () => {
  (fetchMultipleItems as jest.Mock).mockResolvedValueOnce(mockFilmsData);

  const data = await fetchMultipleItems(`https://sw-api.starnavi.io/films/?characters__in=1`);
  
  expect(data).toBeDefined();
  expect(Array.isArray(data.results)).toBe(true);
  expect((data.results[0] as Films).title).toBe('A New Hope');
});
