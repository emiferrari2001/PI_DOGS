import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { allTemperaments, filterDogs, filterOrigin, orderDogs, resetDogs } from '../../redux/actions';

const Filters = () => {
    const temperamentList = useSelector(state => state.temperaments);
    //const allDogsList = useSelector(state => state.someDogs);

    const dispatch = useDispatch();    
    
    const [breedOrder, setBreedOrder] = useState(''); // State que guarda tipo de orden por breed
    const [weightOrder, setWeightOrder] = useState('');

    useEffect(()=>{
        dispatch(allTemperaments());
    },[dispatch])

    useEffect(()=>{
        console.log('cambia orden a', breedOrder);
    },[breedOrder])
    
    

  const toggleBreedOrder = (event) => {
    const selectedValue = event.target.value;
    // Si botón no está activo, seleccionar y deseleccionar el otro
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
  }
  const handleFilterOrigin =(event)=>{
    dispatch(filterOrigin(event.target.value));
  }

  const handleReset =()=>{
    dispatch(resetDogs())
  }

  return (
    <div>
        <div>
            <h3>Order</h3>
            <div>
                <h4>Breeds</h4>
                <button
                    value="breedAsc"
                    onClick={toggleBreedOrder}
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
            <div>
                <h4>Weight</h4>
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
        <div>
            <h3>Filter</h3>
            <div>
                <select name="temperaments" onChange={handleFilterTemperaments}>
                    <option value="All" >All</option>
                    {
                        temperamentList?.map(temperament =>{
                            return(
                                <option key={temperament.id} value={temperament.temperament}>{temperament.temperament}</option>
                            )
                        })
                    }
                </select> 
                <select name="origin" onChange={handleFilterOrigin}>
                    <option value="api">API</option>
                    <option value="created">Created</option>
                </select>          
            </div>
        </div>
        <div>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
  );
};

export default Filters;