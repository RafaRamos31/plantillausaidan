import { useDrag, useDrop } from 'react-dnd'
import { EventoCard } from './EventoCard'

export const DraggableCard = ({id, index, moveCard, values}) => {

  const ItemType = 'CARD';

  const [, ref] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <EventoCard  values={values} />
    </div>
  )
}
