const axios = require('axios');
require('dotenv').config();
const {URL, API_KEY} = process.env;
const {Dog, Temperament} = require('../db');
const {Sequelize, Op } = require('sequelize');
//const URL = "https://api.thedogapi.com/v1/breeds";
//const API_KEY = "api_key=live_Y1wWCrk2W2sIUyb72nLQgigiNk9LiKxhOoA9FRr9GZOjHaujrugZz2xaPbHVxKWb"

//ej de uso con api key: https://api.thedogapi.com/v1/breeds?api_key=live_Y1wWCrk2W2sIUyb72nLQgigiNk9LiKxhOoA9FRr9GZOjHaujrugZz2xaPbHVxKWb

//console.log(URL)

const getDogs = async(req, res) => {
    const {name} = req.query;
try {
    const fetchApi = await axios(`${URL}?${API_KEY}`);
    let allDogsApi =[]
    //console.log(fetchApi.data[0])
    fetchApi.data.map(dog=>{
        const imgId = dog.reference_image_id;
        //console.log(imgId)
        const currDog = {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            image: `https://cdn2.thedogapi.com/images/${imgId}.jpg`,
            temperament: dog.temperament
        }
        allDogsApi.push(currDog)
    })

    //despues de recorrer la api, tengo que revisar la DB
    const dbDog = await Dog.findAll({
        //  where: {
        //      name: {
        //         [Op.like]: `%${name}%`
        //     }
        //  }
    });
    for (const dog of dbDog) {
        //recorro los perros que obtengo de la base de datos y les agrego el temperamento
        const dogForTemperaments = await Dog.findByPk(dog.id);
        const currDogTemperaments = await dogForTemperaments.getTemperaments();
        const temperamentArray = [];
        currDogTemperaments.forEach((temperament) => {
          temperamentArray.push(temperament.dataValues.temperament);
        });
        dog.dataValues.temperament = temperamentArray.join(", ");
        //console.log("dog", dog.dataValues);
      }

    //const perro = await Dog.findByPk(dbDog[0].id)
    //const temperaments = await perro.getTemperaments();
    //console.log('TEMPERAMENT 1',temperaments[0].dataValues.temperament)
    dbDog.forEach(async(dog) => console.log('DATAVALUES', await dog.dataValues));
    //console.log("DBDOG",dbDog);
    if (name) {
        console.log('hay name ', name);
        //filtro los valores de la API y de la DB por nombre
        const filteredDogsApi = allDogsApi.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        const filteredDogsDb = dbDog.filter(dog => dog.dataValues.name.toLowerCase().includes(name.toLowerCase()));
        console.log(filteredDogsApi.length);
        
            if(!dbDog.length) console.log('no hay en db')

            //si hay valores en la API y tambien en la DB, concateno los arrays
            if(filteredDogsApi.length && filteredDogsDb.length) return res.status(200).send(...filteredDogsApi, ...filteredDogsDb)

            if(filteredDogsApi.length && !filteredDogsDb.length) return res.status(200).send(filteredDogsApi)

            //si no hay valores en la API pero si en la DB
            if(filteredDogsDb.length && !filteredDogsApi.length) return res.status(200).send(filteredDogsDb)
            
            //si no hay valores en ninguno de los dos
            throw new Error('The name sent by query has no dogs associated to it');
    }
    //si no se pasa nombre por query
    //console.log(typeof allDogsApi)
    const spreadApiDb = allDogsApi.concat(dbDog);
    if (allDogsApi) return res.status(200).send(Object.values(spreadApiDb));
} catch (error) {
    return error.message.includes('name')
        ? res.status(404).send({error: error.message})
        // error del servidor: error 500
        : res.status(500).send({error: error.message});
    };
}

module.exports = getDogs;