const express = require('express');
const router = express.Router();
// Créer une instance de scategorie.
const scategorie = require('../models/scategorie');

// afficher la liste des scategories.
router.get('/', async (req, res,) => {
    try {
        const cat = await scategorie.find()
        return res.status(200).json(cat)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    const newscategorie = new scategorie(req.body)
    try {
        await newscategorie.save();
        return res.status(200).json(newscategorie);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// chercher une catégorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const cat = await scategorie.findById(req.params.scategorieId);
        return res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// modifier une catégorie
router.put('/:scategorieId', async (req, res) => {
    try {
        const cat1 = await scategorie.findByIdAndUpdate(req.params.scategorieId, { $set: req.body }, { new: true });
        res.status(200).json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie
router.delete('/:scategorieId', async (req, res) => {
    try {


        const id = req.params.scategorieId;
        await scategorie.findByIdAndDelete(id);
        res.json({ message: "scategorie deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
module.exports = router;