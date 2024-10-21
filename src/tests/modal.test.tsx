import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Films, Person, Starships } from '../lib/utils/types';
import Modal from '../components/organisms/Modal';

// Mock ReactFlow to avoid testing the external library itself
jest.mock('@xyflow/react', () => ({
  ReactFlow: ({ nodes, edges }: { nodes: any; edges: any }) => {
    return (
      <div data-testid="mocked-react-flow">
        <div data-testid="nodes">
          {nodes.map((node: any) => (
            <div key={node.id}>{node.data.label}</div>
          ))}
        </div>
        <div data-testid="edges">
          {edges.map((edge: any) => (
            <div key={edge.id}>{edge.id}</div>
          ))}
        </div>
      </div>
    );
  },
}));

describe('Modal component', () => {
  const mockCharacter: Person = {
    id: 1,
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    films: [1],
    hair_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    homeworld: 0,
    species: [],
    vehicle: [],
    starships: [],
    created: '',
    edited: '',
    url: ''
  };

  const mockFilms: Films[] = [
    {
      id: 1, title: 'A New Hope',
      episode_id: 4,
      characters: [1],
      starships: [1],
      opening_crawl: '',
      director: '',
      producer: '',
      release_date: '',
      planets: [],
      vehicles: [],
      species: [],
      created: '',
      edited: '',
      url: ''
    },
  ];

  const mockStarships: Starships[] = [
    {
      id: 1, name: 'Millennium Falcon', pilots: [1],
      model: '',
      manufacturer: '',
      cost_in_credits: '',
      length: '',
      max_atmosphering_speed: '',
      crew: '',
      passengers: '',
      cargo_capacity: '',
      consumables: '',
      hyperdrive_rating: '',
      MGLT: '',
      starship_class: '',
      films: [],
      created: '',
      edited: '',
      url: ''
    },
  ];

  const onCloseMock = jest.fn();

  test('renders the modal with the correct data', async() => {
    render(
      <Modal 
        character={mockCharacter} 
        onClose={onCloseMock} 
      />
    );

    //check if header name displayed
    const heading = screen.getByRole('heading', { name: /Luke Skywalker/i });
    expect(heading).toBeInTheDocument();

    //check if name displayed
    const div = screen.getByText('Luke Skywalker', { selector: 'div' });
    expect(div).toBeInTheDocument();


    //check if film name and starship name displayed
    expect(await screen.findByText('A New Hope')).toBeInTheDocument();
    expect(await screen.findByText('Millennium Falcon')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <Modal 
        character={mockCharacter} 
        onClose={onCloseMock} 
      />
    );

    // Click on the close button
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Verify that the onClose callback is called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render modal if character is null', () => {
    render(
      <Modal 
        character={null} 
        onClose={onCloseMock} 
      />
    );

    // Modal should not be rendered when character is null
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });
});
