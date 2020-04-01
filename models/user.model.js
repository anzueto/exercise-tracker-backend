const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // trim white space at the end
        minlength: 3 // at least 3 characters long
    },
},
    {
        timestamps: true
    });

const User = mongoose.model('User', userSchema);
module.exports = User;    