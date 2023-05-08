const axios = require('axios');
require('dotenv').config();
const {URL, API_KEY} = process.env;
const {Dog} = require('../db');
const {Sequelize, Op } = require('sequelize');
//const URL = "https://api.thedogapi.com/v1/breeds";
//const API_KEY = "api_key=live_Y1wWCrk2W2sIUyb72nLQgigiNk9LiKxhOoA9FRr9GZOjHaujrugZz2xaPbHVxKWb"

//ej de uso con api key: https://api.thedogapi.com/v1/breeds?api_key=live_Y1wWCrk2W2sIUyb72nLQgigiNk9LiKxhOoA9FRr9GZOjHaujrugZz2xaPbHVxKWb

console.log(URL)

const getDogs = async(req, res) => {
    const {name} = req.query;
try {
    const allDogs = await axios(`${URL}?${API_KEY}`);
    if (name) {
        console.log('hay name ', name);
        const filteredDogs = allDogs.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        console.log(filteredDogs.length);
        
            //despues de recorrer la api, tengo que revisar la DB
            const dbDog = await Dog.findAll({
                where: {
                    name: {[Op.like]: `%${name}%`}
                }
            });
            if(!dbDog.length) console.log('no hay en db')

            //si hay valores en la API y tambien en la DB, concateno los arrays
            if(filteredDogs.length && dbDog.length) return res.status(200).send(...filteredDogs, ...dbDog)

            if(filteredDogs.length && !dbDog.length) return res.status(200).send(filteredDogs)

            //si no hay valores en la API pero si en la DB
            if(dbDog.length && !filteredDogs.length) return res.status(200).send(dbDog)
            
            //si no hay valores en ninguno de los dos
            throw new Error('The name sent by query has no dogs associated to it');
        
        //deberia retornar cada uno con los valores que me interesan
    }
    //si no se pasa nombre por query
    if (allDogs) return res.status(200).send(allDogs.data);
} catch (error) {
    return error.message.includes('name')
        ? res.status(404).send({error: error.message})
        // error del servidor: error 500
        : res.status(500).send({error: error.message});
    };
}

module.exports = getDogs;