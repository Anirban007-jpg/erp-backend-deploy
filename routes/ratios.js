const express = require('express');
const {casa, currentRatio, calculatecurrentassetsandliabilities, quickratio,absoluteLiquidityRatio, BasicDefenseInterval, EquityRatio} = require('../controllers/ratios');

const {dataverify, dataverify1} = require('../validators/auth');
const {runValidations} = require('../validators/index');

const router = express.Router();

// Create the Register route using validator functions
router.post("/ratio/calculator/casa", dataverify , runValidations, casa);
router.post("/ratio/calculator/calculatecurrentassetsandliabilities", calculatecurrentassetsandliabilities);
router.post("/ratio/calculator/currentratio", currentRatio);
router.post("/ratio/calculator/quickratio", quickratio);
router.post("/ratio/calculator/absoluteLiquidityRatio", absoluteLiquidityRatio);
router.post("/ratio/calculator/BasicDefenseInterval", BasicDefenseInterval);
router.post("/ratio/calculator/EquityRatio", EquityRatio);



module.exports = router;