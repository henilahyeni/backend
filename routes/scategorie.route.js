const express = require('express');
const router = express.Router();
// Créer une instance de categorie.
const Scategorie = require('../models/scategorie');


// afficher la liste des scategories.
router.get('/', async (req, res) => {
    try {
        const scat = await Scategorie.find()
        return res.status(200).json(scat)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// créer une nouvelle scatégorie
router.post("/", async (req, res) => {
    const newScategorie = new Scategorie(req.body)
    try {
        await newScategorie.save();
        res.status(200).json(newScategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// chercher une scatégorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const scat = await Scategorie.findById(req.params.scategorieId);
        res.status(200).json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une scatégorie
router.delete('/:scategorieId', async (req, res) => {
    const id = req.params.scategorieId;
    await Scategorie.findByIdAndDelete(id);
    res.json({ message: "sous categorie deleted successfully." });
});
// modifier une scatégorie
router.put('/:scategorieId', async (req, res) => {
    try {
        const scat1 = await Scategorie.findByIdAndUpdate(
            req.params.scategorieId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(scat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router