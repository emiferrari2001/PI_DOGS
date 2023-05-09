const {Dog} = require('../db');
const {Temperament} = require('../db');

const postDog = async(req, res) =>{
    const {image, name, height, weight, temperaments, lifespan } = req.body;
try {
    if(!image || !name || !height || !weight || !temperaments.length || !lifespan ) throw new Error('There is information missing to create a new dog');
    const newDog = await Dog.findOrCreate({
        where: {
            image, name, height, weight, lifespan
        },
        defaults: {
            image, name, height, weight, lifespan
        }
    });
    
    // Obtengo instancia del perro creado
    const dogInstance = newDog[0]; 

    // Busco temperamentos por ID y los asocio al perro
    const temperamentsInstances = await Temperament.findAll({
      where: { id: temperaments },
    });

    await dogInstance.setTemperaments(temperamentsInstances);

    return res.status(200).json(newDog);
    
} catch (error) {
    //console.log(error.message);
    return res.status(500).send({error: error.message})
}
}

module.exports= postDog;