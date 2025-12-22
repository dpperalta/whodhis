const { Router }  = require('express');
const { getAbbreviations, getDrugName, getMaHolder, getForms, getStrength } = require('../controllers/vaccinesWhodrug');

const router = Router();

router.get('/abbreviations', [], getAbbreviations);

router.get('/drug-name', [], getDrugName);

router.get('/ma-holder', [], getMaHolder);

router.get('/forms', [], getForms);

router.get('/strength', [], getStrength);

module.exports = router;