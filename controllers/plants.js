const Plant = require("../models/myPlants");
const ExpressError = require('../utils/ExpressError');
const Journal = require('../models/journal');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { cloudinary } = require("../cloudinary");
//FAMILIES
const families = ['Cacti', 'Palm', 'Flower', 'Green plant'];

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


module.exports.index = async (req, res, next) => {
    const { family } = req.query;

    if (family) {
        const plants = await Plant.find({ family }).populate('owner');
        res.render('plants/index', { plants, family: `My ${family.charAt(0).toUpperCase()}${family.slice(1)} Collection` });
    } else {
        const plants = await Plant.find({}).populate('owner');
        res.render('plants/index', { plants, family: 'My Collection' });
    }
}

module.exports.renderNewForm = (req, res) => {
    res.render('plants/new', { families })
}

module.exports.createPlant = async (req, res, next) => {
    const plant = new Plant(req.body.plant);
    plant.owner = req.user._id;
    plant.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await plant.save();
    req.flash('success', 'Successfully made a new plant!');
    res.redirect(`plants/${plant._id}`);
}

module.exports.details = async (req, res) => {
    const plant = await Plant.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    })
        .populate('journals');
    console.log(plant);
    if (!plant) {
        req.flash('error', 'Cannot find that plant.');
        return res.redirect('/plants');
    };
    const dateFormated = convertToYYYYMMDD(plant.date);
    res.render('plants/details', { plant, dateFormated });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const plant = await Plant.findById(id);
    if (!plant) {
        req.flash('error', 'Cannot find that plant.');
        return res.redirect('/plants');
    };
    const dateFormated = convertToYYYYMMDD(plant.date)
    res.render("plants/edit", { plant, families, dateFormated })
}

module.exports.edit = async (req, res, next) => {
    if (!req.body.plant) throw new ExpressError('Invalid PLant Data', 400);
    const { id } = req.params;
    const plant = await Plant.findByIdAndUpdate(id, { ...req.body.plant });
    const photo = req.files.map(f => ({ url: f.path, filename: f.filename }));
    plant.images.push(...photo);
    await plant.save();
    if (req.body.deleteImages) {
        //to DELETE FROM CLOUDINARY
        console.log(req.body.deleteImages);
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        //To DELETE FROM THE DB
        await plant.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Your plant has been successfully updated!');
    res.redirect(`/plants/${plant._id}`);
}

module.exports.addJournal = async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    const journal = new Journal(req.body.journal);
    plant.journals.push(journal);
    await journal.save();
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}

module.exports.deleteJournal = async (req, res) => {
    console.log(req.params.journalId);
    const { id, journalId } = req.params;
    const plant = await Plant.findByIdAndUpdate(id, { $pull: { journals: journalId } });
    console.log(plant);
    await Journal.findByIdAndDelete(journalId);
    req.flash('success', 'Your journal entry has successfully been deleted!')
    res.redirect(`/plants/${id}`)
}

module.exports.deletePlant = async (req, res) => {
    const { id } = req.params;
    const plant = await Plant.findById(id);
    await Plant.findByIdAndDelete(id);
    req.flash('success', 'Your plant has successfully been deleted!')
    res.redirect('/plants');
}