const {Dog} = require('../db');
const {Temperament} = require('../db');

const postDog = async(req, res) =>{
    const {image, name, height, weight, temperaments, life_span } = req.body;
try {
    if(!image || !name || !height || !weight || !life_span ) throw new Error('There is information missing in order to create a new dog');
    if (!temperaments.length) throw new Error('Please select at least one temperament for your dog')
    let temperament = []
    const pushTemperaments = temperaments?.forEach(async(currTemp) => {
        const tempIteration = await Temperament.findOne({ where: { id: currTemp } });
        console.log(tempIteration.dataValues.temperament)
        temperament.push(tempIteration.dataValues.temperament)
    });
    const newDog = await Dog.findOrCreate({
        where: {
            image, name, height, weight, life_span
        },
        defaults: {
            image, name, height, weight, life_span
        }
    });

    //le agrego propiedad a pesar de no poner su valor en la tabla de Dogs de la DB
    //asi se lo puedo pasar al front
    
    
    
    // Obtengo instancia del perro creado
    const dogInstance = newDog[0]; 

    // Busco temperamentos por ID y los asocio al perro
    const temperamentsInstances = await Temperament.findAll({
      where: { id: temperaments },
    });

    await dogInstance.setTemperaments(temperamentsInstances);

    //al estar como array no me sirve para el front entonces lo paso a string
    newDog[0].dataValues.temperament = temperament.join(', ');

    console.log('temperaments')
    console.log(newDog[0].dataValues)
    return res.status(200).json(newDog);
    
} catch (error) {
    //console.log(error.message);
    return error.message.includes('dog')
        ? res.status(404).send({error: error.message})
        // error del servidor: error 500
        : res.status(500).send({error: error.message});
}
}

module.exports= postDog;