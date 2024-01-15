const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
    client:{type:String, required:true},
    produit: {type:String, required:true},
    quantite: {type:Number, required:true},
    prix: {type:Number, required:true},
    date: {type:Date,
        required:true,
        default:Date.now},
    taux: {type:Number, required:true},
    invoice_link: {type:String, required:true},
});
const Vente = mongoose.model('Vente', venteSchema);

module.exports = Vente;