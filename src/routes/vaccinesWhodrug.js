const { Router }  = require('express');
const { getAbbreviations, getDrugName, getMaHolder, getForms, getStrength, getInfoById } = require('../controllers/vaccinesWhodrug');

const router = Router();

router.get('/abbreviations', [], getAbbreviations);

router.get('/drug-name', [], getDrugName);

router.get('/ma-holder', [], getMaHolder);

router.get('/forms', [], getForms);

router.get('/strength', [], getStrength);

router.get('/info/:id', [], getInfoById);

module.exports = router;