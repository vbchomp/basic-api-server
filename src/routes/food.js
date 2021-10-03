'use strict'

const express = require('express');

const { Food } = require('../models/index.js');

const router = express.Router();

// Routes

// Add a food item
router.post('/food', fillMyFridge);
// Get all records of food
router.get('/food', fillMyBelly);
// Get one record food
router.get('/food/:id', fillMyMouth);
// Update a record
router.put('/food/:id', moreDetails);
// Delete a record
router.delete('/food/:id', neverEverAgain);

// Route Handlers Callback functions

// create a food to fill my fridge 
async function fillMyFridge (req, res) {
     let item = req.body;
     let fridge = await Food.create(item);
     res.status(200).json(fridge);
 }

// get all records of food
async function fillMyBelly (req, res) {
    let belly = await Food.findAll();
    res.status(200).json(belly);
}

// get one item of food
async function fillMyMouth (req, res) {
    const id = parseInt(req.params.id);
    let mouthful = await Food.findOne({ where: { id: id } });
    res.status(200).json(mouthful);
}

// update record
async function moreDetails (req, res) {
    const id = parseInt(req.params.id);
    const item = req.body;
    let foodDetails = await Food.findOne({ where: { id: id } });
    let updatedFood = await foodDetails.update(item);
    res.status(200).json(updatedFood);
}

// delete an item of food
async function neverEverAgain (req, res) {
    let id = parseInt(req.params.id);
    let expired = await Food.destroy({ where: {id: id } });
    res.status(200).json(expired);
}

module.exports = router;