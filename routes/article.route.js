const express = require('express');
const router = express.Router();
// Créer une instance de article.
const article = require('../models/article');

// afficher la liste des articles.
router.get('/', async (req, res,) => {
    try {
        const cat = await article.find()
        return res.status(200).json(cat)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    const newarticle = new article(req.body)
    try {
        await newarticle.save();
        return res.status(200).json(newarticle);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// chercher une catégorie
router.get('/:articleId', async (req, res) => {
    try {
        const cat = await article.findById(req.params.articleId);
        return res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// modifier une catégorie
router.put('/:articleId', async (req, res) => {
    try {
        const cat1 = await article.findByIdAndUpdate(req.params.articleId, { $set: req.body }, { new: true });
        res.status(200).json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie
router.delete('/:articleId', async (req, res) => {
    try {


        const id = req.params.articleId;
        await article.findByIdAndDelete(id);
        res.json({ message: "article deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
});
module.exports = router;