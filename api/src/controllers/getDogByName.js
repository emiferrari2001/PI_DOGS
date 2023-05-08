const getDogs = require("./getDogs");

const getDogByName = async(req, res) =>{
    //console.log(req.query)
    const {name} = req.query;
    console.log(name);
try {
    if(!name) throw new Error('No names detected');
    const allDogs = await getDogs();
    console.log(!allDogs)
    const filteredDogs = allDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
    //if (!filteredDogs) return res.status(200).send('No dogs found for the provided name');
    return res.status(200).send(filteredDogs);
} catch (error) {
    return error.message.includes('names')
        ? res.status(404).send({error: error.message})
        // error del servidor: error 500
        : res.status(500).send({error: error.message});
}
}
module.exports = getDogByName;