import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allTemperaments, filterDogs, filterOrigin, orderDogs, resetDogs } from '../../redux/actions';

import styles from './Filters.module.css'

const Filters = () => {

    //traigo todos los temperamentos del estado global para recorrerlos
    const temperamentList = useSelector(state => state.temperaments);
    //const allDogsList = useSelector(state => state.someDogs);

    const dispatch = useDispatch();    
    
    const [breedOrder, setBreedOrder] = useState(''); // State que guarda tipo de orden por breed
    const [weightOrder, setWeightOrder] = useState(''); // State que guarda tipo de orden por weight

    useEffect(()=>{
        //actualizo componente con el dispatch
        dispatch(allTemperaments());
    },[dispatch])

    useEffect(()=>{
       //actualiza el componente cuando cambia el orden de las breeds
    },[breedOrder, weightOrder])
    
    

  const toggleBreedOrder = (event) => {
    const selectedValue = event.target.value;
    // Si botón no está activo, seleccionar y deseleccionar el otro

    //si el orden anterior es igual al valor del evento no pasa nada, caso contrario, modifico el valor
    setBreedOrder((prevOrder) => (prevOrder === selectedValue ? '' : selectedValue));
    dispatch(orderDogs(event.target.value))
  };

  const toggleWeightOrder = (event) => {
    const selectedValue = event.target.value;    
    setWeightOrder((prevOrder) => (prevOrder === selectedValue ? '' : selectedValue));
    dispatch(orderDogs(event.target.value))
    
  };

  const handleFilterTemperaments =(event)=>{
    dispatch(filterDogs(event.target.value));
    //cambio el select de origin para mostrar 'All' al usuario porque se traen perros de ambos origines
    document.getElementById("select-origin").value = "All"; 
}
const handleFilterOrigin =(event)=>{
    dispatch(filterOrigin(event.target.value));
    //cambio el select elect de temperaments para mostrar 'All' al usuario porque se traen perros de todos los temperamentos
    //document.getElementById("temperaments-select").value = "All";
}

  const handleReset =()=>{
    dispatch(resetDogs())
    dispatch(filterDogs("All"));
    //hago que el select vuelva a decir "all"
    document.getElementById("temperaments-select").value = "All"; 
    document.getElementById("select-origin").value = "All"; 
    
    
  }

  return (
    <div className={styles.filterContainer}>
        <div className={styles.resetButton}>
            <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.orderContainer}>
            <h3>Order</h3>
            <div className={styles.breedContainer}>
                <h4>Breed</h4>
                <div className={styles.ascDescButtons}>
                <button
                    value="breedAsc"
                    onClick={toggleBreedOrder}
                    //ternario para hacer que el boton aparezca como seleccionado (con la clase 'active')
                    className={breedOrder === 'breedAsc' ? 'active' : ''}>
                    Asc
                </button>
                <button
                    value="breedDesc"
                    onClick={toggleBreedOrder}
                    className={breedOrder === 'breedDesc' ? 'active' : ''}>
                    Desc
                </button>
                </div>
            </div>
            <div>
                <h4>Weight</h4>
                <div className={styles.ascDescButtons}>
                <button
                    value="weightAsc"
                    onClick={toggleWeightOrder}
                    className={weightOrder === 'weightAsc' ? 'active' : ''}>
                    Asc
                </button>
                <button
                    value="weightDesc"
                    onClick={toggleWeightOrder}
                    className={weightOrder === 'weightDesc' ? 'active' : ''}>
                    Desc
                </button>     

                </div>
            </div>
        </div>
        <div className={styles.filterContainer}>
            <h3>Filter</h3>
            <div className={styles.selects}>
                <h4 className={styles.h4Title}>Temperament</h4>
                <select name="temperaments" id='temperaments-select' onChange={handleFilterTemperaments}>
                    <option value="All" >All</option>
                    {/* Render de la lista de temperamentos como opciones en el select */}
                    {
                        temperamentList?.map(temperament =>{
                            return(
                                <option key={temperament.id} value={temperament.temperament}>{temperament.temperament}</option>
                            )
                        })
                    }
                </select> 
                <h4 className={styles.h4Title}>Creation</h4>
                <select name="origin" id='select-origin' onChange={handleFilterOrigin}>
                    <option value="All" >All</option>
                    <option value="api">API</option>
                    <option value="created">Created</option>
                </select>          
            </div>
        </div>
        
    </div>
  );
};

export default Filters;