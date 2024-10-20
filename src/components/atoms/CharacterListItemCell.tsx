interface CharactersListItemCellProps {
  content: string
}

// This component used to customize text inside CharactersListItem

function CharactersListItemCell({content} : CharactersListItemCellProps) {
  return (
    <p>
      {content}
    </p>
  )
}

export default CharactersListItemCell;