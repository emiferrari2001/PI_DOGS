const { Dog } = require('../db');
const { Temperament } = require('../db');

const postDog = async (req, res) => {
  const { image, name, height, weight, temperaments, life_span } = req.body;
  try {
    if (!image || !name || !height || !weight || !life_span)
      throw new Error('There is information missing in order to create a new dog');

    // if (!temperaments.length)
    //   throw new Error('Please select at least one temperament for your dog');

    const existingDog = await Dog.findOne({ where: { name } });
    if (existingDog)
      throw new Error('A dog with that name already exists');

    let temperament = [];

    await Promise.all(
        //espera a que se mapeen y agreguen TODOS los temperamentos
      temperaments.map(async (currTemp) => {
        //busca en DB temperamentos on el mismo id
        const tempIteration = await Temperament.findOne({ where: { id: currTemp } });
        if (tempIteration) {
          //pushea nombre del temperamento
          temperament.push(tempIteration.dataValues.temperament);
        }
      })
    );

    const newDog = await Dog.create({
      image,
      name,
      height,
      weight,
      life_span,
    });

    //guardo valores del perro creado en variable 
    //para manipular directamente y agregar temperamentos
    const dogInstance = newDog.dataValues;

    const temperamentsInstances = await Temperament.findAll({
      where: { id: temperaments },
    });

    //establece relacion entre el perro creado y sus temperamentos
    await newDog.setTemperaments(temperamentsInstances);

    //al estar como array no me sirve para el front entonces lo paso a string
    dogInstance.temperament = temperament.join(', ');

    return res.status(200).json(dogInstance);
  } catch (error) {
    //si el mensaje de error incluye "dog" es un error del usuario, no del server
    return error.message.includes('dog')
      ? res.status(404).send({ error: error.message })
      : res.status(500).send({ error: error.message });
  }
};

module.exports = postDog;