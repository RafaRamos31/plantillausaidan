import React, { useState } from 'react'
import { EventoCard } from './EventoCard';
import { useDrop } from 'react-dnd';

export const EventStack = ({ events }) => {
  const [cardList, setCardList] = useState(events);

  const [, drop] = useDrop({
    accept: 'CARD', // Tipo de elemento que puedes soltar
    drop: (item) => ({}), // Función para manejar el evento de soltar
  });

  const moveCard = (fromIndex, toIndex) => {
    const updatedList = [...cardList];
    const [removed] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, removed);
    setCardList(updatedList);
  };

  return (
    <div>
      {cardList.map((card, index) => (
        <EventoCard key={card._id} id={card._id} moveCard={moveCard} index={index} values={card} />
      ))}
    </div>
  );
}
