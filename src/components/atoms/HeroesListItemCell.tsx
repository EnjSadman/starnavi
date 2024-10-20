interface HeroesListItemCellProps {
  content: string
}

function HeroesListItemCell({content} : HeroesListItemCellProps) {
  return (
    <div>
      {content}
    </div>
  )
}

export default HeroesListItemCell;