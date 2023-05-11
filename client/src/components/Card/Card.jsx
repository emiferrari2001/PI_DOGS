const Card = ({id, name, image, height, weight, lifespan, temperament})=>{
if(temperament){
    temperament = temperament.split(' ')
} 
    return(
        <div>
            <h3> {name} </h3>
            <img src={image} alt={name} style={{ width: '400px', height: '200px' }} />
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