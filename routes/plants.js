const express = require('express');
const plants = require('../controller/plants');

const router = express.Router();

router.get('/',plants.getPlants);

router.get('/addplant',plants.addPlant);

router.post('/addplant',plants.postPlant);

router.get('/addplant/:id',plants.getPlant);

router.post('/deleteplant/:id',plants.deletePlant);

module.exports = router;