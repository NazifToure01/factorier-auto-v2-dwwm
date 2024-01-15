const Produit= require("../models/Produit")

const getProduits = async (req, res) => {
    try {
        let produit = await Produit.find();
        res.send(produit).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addProduit = async (req, res) => {




    try {
        let produit = await Produit.create(req.body);
        res.send(produit).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateProduit = async (req, res) => {
    let id = req.params.id;
    try{
        await Produit.findByIdAndUpdate(id, req.body);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}





module.exports = {
    getProduits,
    addProduit,
    updateProduit
}