const axios = require('axios');
const getDogs = require('./getDogs');
require('dotenv').config();
const {Temperament} = require('../db');
const {URL, API_KEY} = process.env;

const getTemperaments = async(req, res)=>{
    try {
        const {data} = await axios(`${URL}?${API_KEY}`);
        let allTemperaments = [];
        //console.log(data[0])
        data.forEach(dog => {
            if(dog.temperament){
                const temperaments = dog.temperament.split(', ');
                temperaments.forEach(temperament =>{
                    if(!allTemperaments.includes(temperament)){
                        allTemperaments.push(temperament);
                    }
                })
            }            
        });
        allTemperaments.sort();
        let bulkTemperaments = [];
        allTemperaments.forEach( temperament =>{
            const obj = {temperament: temperament};
            bulkTemperaments.push(obj)
        })

        const createTemps = await Temperament.bulkCreate(bulkTemperaments);
        //console.log(bulkTemperaments);
        if (createTemps) return res.status(200).send({ success: 'Temperaments stored in the database' });
      } catch (error) {
        //console.log(error);
        return res.status(500).send({ error: error.message });
      }
}

module.exports = getTemperaments;