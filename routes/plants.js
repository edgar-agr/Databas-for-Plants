const express = require('express');
const plants = require('../controller/plants');

const router = express.Router();

router.get('/',plants.getPlants);

module.exports = router;