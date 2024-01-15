const express = require('express');
const router = express.Router();

const {getVentes, addVente, } = require('../controllers/vente.controller')

router.get('/', getVentes);
router.post('/', addVente);


module.exports = router;