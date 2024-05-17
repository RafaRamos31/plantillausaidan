import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export const Draggable = ({id, finalizado=false, children}) => {
  const {attributes, listeners, setNodeRef, transform, active} = useDraggable({
    id: id,
    disabled: finalizado
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    borderRadius: '10px',
    marginBottom: '10px',
    border: active ? '1px solid black': null
  }

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}