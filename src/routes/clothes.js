'use strict'

const express = require('express');

const { Clothes } = require('../models/index.js');

const router = express.Router();

// Routes

// Add an article of clothing
router.post('/clothes', addToCloset);
// Get all records of clothing
router.get('/clothes', getMyClothes);
// Get one record
router.get('/clothes/:id', getAnArticle);
// Update a record
router.put('/clothes/:id', updateCloset);
// Delete a record
router.delete('/clothes/:id', giveToGoodWill);

// Route Handlers Callback functions

// create an article of clothing 
async function addToCloset (req, res) {
     let item = req.body;
     let newItem = await Clothes.create(item);
     res.status(200).json(newItem);
 }

// get all records of clothing
async function getMyClothes (req, res) {
    let closet = await Clothes.findAll();
    res.status(200).json(closet);
}

// get one item of clothing
async function getAnArticle (req, res) {
    const id = parseInt(req.params.id);
    let article = await Clothes.findOne({ where: { id: id } });
    res.status(200).json(article);
}

// update record
async function updateCloset (req, res) {
    const id = parseInt(req.params.id);
    const item = req.body;
    let clothes = await Clothes.findOne({ where: { id: id } });
    let updatedClothes = await clothes.update(item);
    res.status(200).json(updatedClothes);
}

// delete an item of clothing
async function giveToGoodWill (req, res) {
    let id = parseInt(req.params.id);
    let goodWillTrip = await Clothes.destroy({ where: {id: id } });
    res.status(200).json(goodWillTrip);
}

module.exports = router;