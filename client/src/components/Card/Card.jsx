import { NavLink } from "react-router-dom";
const Card = ({id, name, image, weight, temperament})=>{
    //si no tiene imagen, seteo un placeholder
if (!image) image = 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-dog-logo-design-vector-icon-png-image_1824202.jpg'
if(weight.includes('NaN')) weight = "Not specified"
    if(temperament){
    temperament = temperament.split(' ')
} 
    return(
        <div>
            <h3> 
            <NavLink to={`/detail/${id}`}>{name}</NavLink>
            </h3>
            <img src={image} alt={name} style={{ width: '300px', height: '150px', justifyContent: 'center' }} />
            <div>
                <p>{temperament}</p>
            {/* {
                //console.log(typeof temperament)
                Array.isArray(temperament) && temperament.map((temperament, index) => (
                    <p key={index}>{temperament}</p>
                ))
            } */}
            </div>
            {/* si weight no contiene 'Not Specified' se renderea el peso con 'kg' y si no el 'Not Specified' */}
            <p> {`${weight !== "Not specified" ? weight + ' kg' : weight} `} </p>
        </div>
    )
}
export default Card;