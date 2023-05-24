import React, { useState, useEffect, useCallback } from 'react';
import { allDogs } from '../../redux/actions';
import { useSelector, useDispatch } from "react-redux";

import Card from '../Card/Card';

import styles from './Cards.module.css';

const Cards = ({ currentPage, dogsPerPage }) => {
  const dispatch = useDispatch();

  //la lista de perros contiene a los actuales (someDogs)
  const allDogsList = useSelector(state => state.someDogs);
  const {order, filter} = useSelector(state => state);
  const [dogs, setDogs] = useState([]);

  //useCallback para que no tener dependencias faltantes
  const fetchDogs = useCallback(() => {
    // Defino el fragmento del array total a mostrar
    var firstIndex = (currentPage - 1) * dogsPerPage;
    var lastIndex = firstIndex + dogsPerPage;
    const dogsInPage = allDogsList.slice(firstIndex, lastIndex);
    // Modificar el estado
    setDogs(dogsInPage);    
  }, [currentPage, dogsPerPage, allDogsList]);

  useEffect(() => {
    // Llamar a fetchDogs al montar el componente
    // y cuando se actualiza el order o filter
    fetchDogs();
  }, [fetchDogs, order, filter]);

  useEffect(() => {
    // Dispatch de acción de Redux para obtener todos los perros
    if(!allDogsList.length) dispatch(allDogs());
  }, [dispatch, allDogsList.length]);

  return (
    <div className={styles.cardsContainer}>
      {/* si hay perros, los mapeo y por cada uno rendereo una Card
      paso los valores por props */}
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