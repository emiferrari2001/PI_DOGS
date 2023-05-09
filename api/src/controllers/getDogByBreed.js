const axios = require('axios');
require('dotenv').config();
const {URL, API_KEY} = process.env;
const {Dog} = require('../db')
//const URL = "https://api.thedogapi.com/v1/breeds";
//const API_KEY = "api_key=live_Y1wWCrk2W2sIUyb72nLQgigiNk9LiKxhOoA9FRr9GZOjHaujrugZz2xaPbHVxKWb"

//ej de uso con api key: https://api.thedogapi.com/v1/breeds?api_key=live_Y1wWCrk2W2sIUyb72nLQgigiNk9LiKxhOoA9FRr9GZOjHaujrugZz2xaPbHVxKWb


const getDogs = async(req, res) => {
    const {id} = req.params;
try {
    if(id && id < 259){
        const result = await axios(`${URL}/${id}?${API_KEY}`);
        const {name, temperament, reference_image_id, height, weight, life_span} = result.data;
        if(!name) throw new Error(`There are no dogs with the ID: ${id}.`)
        console.log(reference_image_id)
        const image = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`
        const dog = {
            id: id,
            name: name,
            image: image,
            temperament: temperament,
            height: height.metric,
            weight: weight.metric,
            lifespan: life_span,
        }
        //console.log(dog)
        return res.status(200).json(dog);
    }
    if(id && id > 259) throw new Error(`There are no dogs with the ID: ${id}.`);
    // si es un valor distinto a un nro entre 1 y 259 significa que recibe un perro de la DB
    const dog = await Dog.findByPk(id)
    if(!dog) throw new Error(`There are no dogs with the ID: ${id}.`)
    return res.status(200).send(dog);
} catch (error) {
    return error.message.includes('ID')
        ? res.status(404).send({error: error.message})
        // error del servidor: error 500
        : res.status(500).send({error: error.message});
        };
}

module.exports = getDogs;