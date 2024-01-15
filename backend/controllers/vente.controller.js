const Vente = require('../models/Vente');
const fs = require('fs');
const path = require('path');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const getVentes = async (req, res) => {
    try {
        let vente = await Vente.find();
        res.send(vente).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addVente = async (req, res) => {

    try {

        const content = fs.readFileSync(
            path.resolve(__dirname, "../public/template/invoice.docx"), "binary");
        const zip = new PizZip(content);


    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });


    const { client,
        produit,
        quantite,
        prix,
        total,
        taux} = req.body;

    const tva = taux*total/100;
    const ttc = total+tva;

    const invoice_number = 'ABC'+Math.floor(Math.random() * 10000);

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
        invoice_number: invoice_number,
        client: client,
        date: new Date(),
        quantite:quantite,
        produit: produit,
        prix: prix,
        taux: taux,
        total: total,
        tva: tva,
        ttc: ttc,

    });
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const outputPath = path.resolve(__dirname, `../public/factures/output-${uniqueSuffix}.docx`);

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });

        fs.writeFileSync(outputPath, buf);
        console.log("File written to disk");

        const invoice_link = `http://localhost:4000/public/factures/output-${uniqueSuffix}.docx`;

        let vente = await Vente.create({...req.body, invoice_link});
        res.send(vente).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    getVentes,
    addVente,
}