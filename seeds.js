const mongoose = require('mongoose');
const Plant = require("./models/myPlants");

mongoose.connect('mongodb://localhost:27017/plants')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!")
        console.log(err)
    });



const seedPlants = [
    {
        name: 'Ficus',
        date: 2020 / 08 / 11,
        family: 'green plant'

    },
    {
        name: 'Monstera',
        date: 2020 / 04 / 06,
        family: 'green plant'

    },
    {
        name: 'Basilic',
        date: 2020 / 05 / 11,
        family: 'Herb'

    },
    {
        name: 'Rose',
        date: 2020 / 06 / 01,
        family: 'flower'

    }

]
Plant.insertMany(seedPlants)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })