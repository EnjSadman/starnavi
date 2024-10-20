import { Person } from "../../lib/utils/types";
import HeroesListItemCell from "../atoms/HeroesListItemCell";

function HeroesListItem({person, click} : {person : Person, click : (person : Person) => Promise<void>}) {
  return (
    <div
      className="min-h-20 flex justify-between cursor-pointer"
      onClick={() => click(person)}
    >
      <HeroesListItemCell content={person.name} />
      <HeroesListItemCell content={person.gender} />
    </div>
  )
}

export default HeroesListItem;