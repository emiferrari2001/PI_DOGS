import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Detail = ()=>{
    const [dog, setDog] = useState([])
    const {id} = useParams();

    useEffect(()=>{
        //cada vez que se actualiza el id se actualiza el componente 
        axios(`http://localhost:3001/dogs/${id}`).then(({data}) => {
            if(data.name){
                setDog(data);
            } else {
                window.alert(`There's no dogs with the ID: ${id}`);
            }
        })
        return setDog({})
    }, [id])
    let number = 0;
    
return(
    <div>
        
        <h3>Detail {dog.name}</h3>
        <img src={dog.image} alt={dog.name} />
        <p>Height: {dog.height} cm</p>
        <p>Weight: {dog.weight}</p>
        <p>Lifespan: {dog.lifespan}</p>
        <p>Temperaments:</p>
        <ul>
            {
                dog.temperament?.split(' ').map(currTemperament =>{
                    console.log(currTemperament)
                    ++number;
                    return(
                        <li key={number}>{currTemperament}</li>
                    )
                })
            }
        </ul>
    </div>
)
}

export default Detail;