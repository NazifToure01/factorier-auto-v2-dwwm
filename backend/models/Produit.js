const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: {type:String, required:true},
    price: {type:String, required:true},
    image: {type:String},
});
const produit = mongoose.model('Produit', produitSchema);
module.exports = produit;