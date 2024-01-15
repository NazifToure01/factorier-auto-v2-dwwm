const express = require('express');
const router = express.Router();
const {getProduits, addProduit, updateProduit} = require('../controllers/produit.controller')

router.get('/', getProduits);
router.post('/', addProduit);
router.put('/:id', updateProduit);
module.exports = router;