import { Person } from "../../lib/utils/types";
import CharactersListItemCell from "../atoms/CharacterListItemCell";


interface CharactersListItemProps {
  person : Person,
  click : (person : Person) => Promise<void>
}

// This component used to display single person data

function CharactersListItem({person, click} : CharactersListItemProps) {
  return (
    <div
      className="min-h-20 flex justify-between items-center cursor-pointer border-b-2 border-black"
      onClick={() => click(person)}
    >
      <CharactersListItemCell content={person.name} />
      <CharactersListItemCell content={person.gender} />
    </div>
  )
}

export default CharactersListItem;