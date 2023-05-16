import { NavLink } from "react-router-dom";
const Card = ({id, name, image, height, weight, lifespan, temperament})=>{
if(temperament){
    temperament = temperament.split(' ')
} 
    return(
        <div>
            <h3> 
            <NavLink to={`/detail/${id}`}>{name}</NavLink>
            </h3>
            <img src={image} alt={name} style={{ width: '300px', height: '150px', justifyContent: 'center' }} />
            {
                //console.log(typeof temperament)
                Array.isArray(temperament) && temperament.map((temperament, index) => (
                    <p key={index}>{temperament}</p>
                ))
            }
            <p> {weight} kg</p>
        </div>
    )
}
export default Card;