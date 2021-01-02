const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

//This is going to add on to our schema a username and a password
UserSchema.plugin(passportLocalMongoose);

//Compile
module.exports = mongoose.model('User', UserSchema);