const mongoose = require('mongoose');
const Plant = require("./models/myPlants");

mongoose.connect('mongodb://localhost:27017/plants', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!")
        console.log(err)
    });



// const p = new Plant({
//     name: 'Pothos',
//     date: 2020 / 09 / 13,
//     family: 'green plant'
// })

// p.save().then(p => {
//     console.log(p)
// })
//     .catch(e => {
//         console.log(e)
//     })
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