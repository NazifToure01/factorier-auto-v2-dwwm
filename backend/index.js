const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const produitRoute = require('./routes/produit.route');
const venteRoute = require('./routes/vente.route');
const path = require("path");
app.use("/public", express.static(path.join(__dirname, 'public')));
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World ');
});

app.use('/api/product', produitRoute);

app.use('/api/vente', venteRoute);

mongoose.connect('mongodb://localhost:27017/facturier').then(() => {
    console.log('Connected to database successfully');
}).catch((err) => {
    console.log('Connection failed');
    console.log(err);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
