import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PopUp from '../PopUp/PopUp';

import styles from './Detail.module.css'

const Detail = ()=>{
    const [dog, setDog] = useState([])
    const {id} = useParams();

    const [popUp, setPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState('')

    useEffect(()=>{
        // Cada vez que se actualiza el id se actualiza el componente 
        axios(`http://localhost:3001/dogs/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setDog(data);
        } 
      })
      .catch((error) => {
        //si hay un error con axios
        setPopUp(true);
        if(id){
            setPopUpMessage(`There's no dogs with the ID: ${id}`);
        }
        setPopUpMessage(`There's been an error fetching the data`);
      });
      //al desmontar el componente se resetea el detalle
        return setDog({})
    }, [id])

    const handleImageError =(event)=>{
        //si hay error es porque del back viene como jpg entonces lo reemplazo
        event.target.src = event.target.src.replace(".jpg", ".png");
    }

    
return(
    <div className={styles.allDetail}>
        {
            popUp === true && <PopUp trigger={popUp} setTrigger={setPopUp}>
            <h3>{popUpMessage}</h3>
            </PopUp>
        }
        <div className={styles.detailCard}>        
            <img src={dog.image && dog.image} alt={dog.name} onError={handleImageError}/>
            <h3>{dog.name}</h3>
            <div className={styles.detailDivContainer}>
                <div className={styles.detailDivs}>
                    <h5>Height<br />(cm)</h5>
                    <p>{dog.height}</p>
                </div>
                <div className={styles.detailDivs}>
                    <h5>Weight<br />(kg)</h5>
                    <p>{dog.weight}</p>
                </div>
                <div className={styles.detailDivs}>
                    <h5>Lifespan<br />(years)</h5>
                    {/* Quito la palabra 'Years' del lifespan si es que tiene */}
                    <p>{dog.lifespan?.split(' years')}</p>
                </div>
            </div>
            <h5>Temperaments:</h5>
            {/* Si tiene temperamentos, render condicional */}
            <p className={styles.temperaments}>{dog.temperament ? dog.temperament : 'Not specified'}</p>
            
            <button> <NavLink to='/home'>Back</NavLink> </button>
        </div>

    </div>
)
}

export default Detail;