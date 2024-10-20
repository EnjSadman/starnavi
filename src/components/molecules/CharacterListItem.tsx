import { Person } from "../../lib/utils/types";
import CharactersListItemCell from "../atoms/CharacterListItemCell";


interface CharactersListItemProps {
  character: Person,
  click: (person : Person) => Promise<void>
}

// This component used to display single person data

function CharactersListItem({character, click} : CharactersListItemProps) {
  return (
    <div
      className="min-h-20 flex justify-between items-center cursor-pointer border-b-2 border-black"
      onClick={() => click(character)}
    >
      <CharactersListItemCell content={character.name} />
      <CharactersListItemCell content={character.gender} />
    </div>
  )
}

export default CharactersListItem;