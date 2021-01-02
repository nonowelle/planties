const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { isLoggedIn, isOwner, validateJournal, validatePlant } = require('../middleware');
const plants = require('../controllers/plants');


//DATE FORMATING
function convertToYYYYMMDD(d) {
    date = new Date(d);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return (year + '-' + month + '-' + dt);
}



//FAMILIES
const families = ['Cacti', 'Palm', 'Flower', 'Green plant'];

//ROUTES

//DISCOVER AND NEW PLANT
router.route('/')
    .get(isLoggedIn, catchAsync(plants.index))
    .post(isLoggedIn, upload.array('image'), validatePlant, catchAsync(plants.createPlant));

//NEW PLANT FORM
router.get("/new", isLoggedIn, plants.renderNewForm)



//DETAILS, EDIT AND DELETE PLANT
router.route('/:id')
    .get(isLoggedIn, catchAsync(plants.details))
    .put(isLoggedIn, isOwner, upload.array('image'), validatePlant, catchAsync(plants.edit))
    .delete(isLoggedIn, isOwner, catchAsync(plants.deletePlant))

//EDIT FORM
router.get("/:id/edit", isLoggedIn, isOwner, catchAsync(plants.renderEditForm))


//REDIRECT AFTER ADDING JOURNAL
router.post("/:id/journals", isLoggedIn, isOwner, validateJournal, catchAsync(plants.addJournal))


//DELETE JOURNAL ENTRY
router.delete('/:id/journals/:journalId', isLoggedIn, isOwner, catchAsync(plants.deleteJournal))



module.exports = router;

