import { NavLink } from "react-router-dom";

import styles from './Card.module.css'

const Card = ({id, name, image, weight, temperament})=>{
    //si no tiene imagen, seteo un placeholder
    if (!image) image = 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg'
    //cambio el valor de weight si incluye "NaN"
    if(weight.includes('NaN')) weight = "Not specified"

    return(
        <div className={styles.cardContainer}>
            <img src={image} alt={name} />
            <h3> 
            <NavLink to={`/detail/${id}`}>{name}</NavLink>
            </h3>
            <div>
                <p>{temperament}</p>
            </div>
            {/* si weight no contiene 'Not Specified' se renderea el peso con 'kg' y si no el 'Not Specified' */}
            <p className={styles.weight}> {`Weight: ${weight !== "Not specified" ? weight + ' kg' : weight} `} </p>
        </div>
    )
}
export default Card;