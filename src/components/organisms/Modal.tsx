import React from 'react';
import { Films, Person, Starships } from '../../lib/utils/types';
import { Edge, ReactFlow, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface ModalProps {
  character: Person | null;
  films: Films[];
  starships: Starships[];
  onClose: () => void;
}

const NODE_WIDTH = 200;
const NODE_PADDING = 10;
const NODE_BORDER_RADIUS = 5;
const FILM_POSITION_X_INCREMENT = 200;

const Modal: React.FC<ModalProps> = ({ character, films, starships, onClose }) => {
  if (!character) return null;
  const starshipMap: Record<string, string> = {};
  const edges: Edge[] = [];

  const nodes: Node[] = [
    {
      id: 'character',
      type: 'default',
      data: { label: character.name },
      position: { x: 250, y: 50 },
      style: { background: '#f0f0f0', padding: NODE_PADDING, borderRadius: NODE_BORDER_RADIUS, width: NODE_WIDTH },
    },
  ];

  let filmPositionX = 50; 
  let starshipPositionY = 300; 

  films.forEach((film) => {
    const filmNodeId = `film-${film.id}`;

    nodes.push({
      id: filmNodeId,
      type: 'default',
      data: { label: film.title },
      position: { x: filmPositionX, y: 200 },
      style: { background: '#fff', padding: NODE_PADDING, borderRadius: NODE_BORDER_RADIUS, width: NODE_WIDTH },
    });

    edges.push({
      id: `edge-character-${film.id}`,
      source: 'character',
      target: filmNodeId,
    });

    film.starships.forEach((starshipId, index) => {
      const starship = starships.find((ship) => ship.id === starshipId);
      if (starship) {
        const starshipNodeId = `starship-${starship.id}`;

        if (!starshipMap[starshipNodeId]) {
          nodes.push({
            id: starshipNodeId,
            type: 'default',
            data: { label: starship.name },
            position: { x: filmPositionX, y: starshipPositionY + (index * 50) },
            style: { background: '#e0e0e0', padding: NODE_PADDING, borderRadius: NODE_BORDER_RADIUS, width: NODE_WIDTH },
          });

          starshipMap[starshipNodeId] = starshipNodeId;
        }

        edges.push({
          id: `edge-${filmNodeId}-starship-${starship.id}`,
          source: filmNodeId,
          target: starshipNodeId,
        });
      }
    });

    filmPositionX += FILM_POSITION_X_INCREMENT;
  });

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{character.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div style={{ height: '600px', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            style={{ width: '100%', height: '100%' }}
            elementsSelectable={false}
            zoomOnPinch={false}
          >
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default Modal;
