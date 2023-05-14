import React, { useState, useEffect, useCallback } from 'react';
import { allDogs } from '../../redux/actions';
import { useSelector, useDispatch } from "react-redux";
import Card from '../Card/Card';

const Cards = ({ currentPage, dogsPerPage }) => {
  const dispatch = useDispatch();
  const allDogsList = useSelector(state => state.someDogs);
  const order = useSelector(state => state.order);
  const [dogs, setDogs] = useState([]);

  const fetchDogs = useCallback(() => {
    // Definir el fragmento del array total a mostrar
    var firstIndex = (currentPage - 1) * dogsPerPage;
    var lastIndex = firstIndex + dogsPerPage;
    const dogsInPage = allDogsList.slice(firstIndex, lastIndex);
    // Modificar el estado
    setDogs(dogsInPage);    
  }, [currentPage, dogsPerPage, allDogsList]);

  useEffect(() => {
    // Llamar a fetchDogs inicialmente, al montar el componente
    // y cuando se actualiza el order
    fetchDogs();
  }, [fetchDogs, order]);

  useEffect(() => {
    // Llamar a la acción de Redux para obtener todos los perros
    dispatch(allDogs());
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {dogs?.map((dog) => {
        return(
            <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            temperament={dog.temperament}
            weight={dog.weight}
            height={dog.height}
            lifespan={dog.lifespan}
            />                
        )
        })
    }
    </div>
  );
};

export default Cards;