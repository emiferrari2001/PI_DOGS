import React, { useState, useEffect, useCallback } from 'react';
import { allDogs } from '../../redux/actions';
import { useSelector, useDispatch } from "react-redux";
import Card from '../Card/Card';

import styles from './Cards.module.css';

const Cards = ({ currentPage, dogsPerPage }) => {
  const dispatch = useDispatch();
  const allDogsList = useSelector(state => state.someDogs);
  const {order, filter} = useSelector(state => state);
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
  }, [fetchDogs, order, filter]);

  useEffect(() => {
    // Llamar a la acción de Redux para obtener todos los perros
    dispatch(allDogs());
  }, [dispatch]);

  return (
    <div className={styles.cardsContainer}>
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