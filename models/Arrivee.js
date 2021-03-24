require("dotenv").config();
const mongoose = require('mongoose');

const arriveeSchema = new mongoose.Schema({
    nom:{
        type: String,
        trim: true,
    },
    prenom:{
        type: String,
        trim: true,
    },
    date:{
        type: Date,
    },
    email: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
        trim: true,
    }
},
{ collection: 'liste-av' });

module.exports = mongoose.model('Arrivee', arriveeSchema);