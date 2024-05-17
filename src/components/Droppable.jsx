import {useDroppable} from '@dnd-kit/core';

export const Droppable = ({id, Element, children}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id
  });

  const style = {
    height: '75vh',
    backgroundColor: isOver ? '#e9e9e9': null,
  }
  
  return (
    <div ref={setNodeRef} style={style}>
      <Element>
        {children}
      </Element>
    </div>
  );
}