import { useState, useEffect } from 'react';
import { allDogs } from '../../redux/actions';
import { useSelector, useDispatch } from "react-redux";
import Card from '../Card/Card';


const Cards = ({ currentPage, dogsPerPage }) => {
    
const dispatch = useDispatch();
const allDogsList = useSelector(state => state.allDogs);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, [currentPage]);

  const fetchDogs = () => {
    //obtengo todos los perros
    dispatch(allDogs());
    //basado en currentPage tengo que seleccionar un grupo de perros
    var firstIndex = (currentPage - 1) * dogsPerPage;
    var lastIndex = firstIndex + dogsPerPage;
    const dogsInPage = allDogsList.slice(firstIndex, lastIndex);
    setDogs(dogsInPage);    
  };

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