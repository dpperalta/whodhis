const { request, response }  = require('express');

const VaccinesWhoDrug = require('../models/VaccinesWhoDrug');
const { sequelize } = require('../database/connection');

// Get Country List of Abbreviations
const getAbbreviations = async ( req = request, res = response ) => {
    const country = req.query.country || '';
    try {
        const abbreviationsCount = await sequelize.query(`
            SELECT COUNT (*)
            FROM (
            SELECT DISTINCT ON (vw.abbreviation)
                *
            FROM "vaccinesWhodrug" vw 
            WHERE vw."iso3Code" = '${country}'
            OR (
                vw."iso3Code" is null
                and vw."language" = 'es'
                and vw."isPreferred" = 1
            )) vaccines;
        `);
        const totalAbbreviations = await sequelize.query(`
            SELECT COUNT (*)
            FROM (
            SELECT *
            FROM "vaccinesWhodrug" vw 
            WHERE vw."iso3Code" = '${country}'
            OR (
                vw."iso3Code" is null
                and vw."language" = 'es'
                and vw."isPreferred" = 1
            )) vaccines;
        `);
        const count = abbreviationsCount[0][0].count;
        const total = totalAbbreviations[0][0].count;
        if ( count > 0 ) { 
            const abbreviations = await sequelize.query(`
                SELECT DISTINCT ON (vw.abbreviation)
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE vw."iso3Code" = '${country}'
                OR (
                    vw."iso3Code" is null
                    and vw."language" = 'es'
                    and vw."isPreferred" = 1
                )
                ORDER BY vw.abbreviation ASC;
            `);
            return res.status(200).json({
                ok: true,
                count,
                total,  
                abbreviations: abbreviations[0]
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No abbreviations found for the specified country'
            });
        }
    } catch (error) {
        console.log('Error fetching abbreviations:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
};

const getDrugName = async ( req = request, res = response ) => {
    const country = req.query.country || '';
    const abbreviation = req.query.abbreviation || '';
    try {
        const drugNameCount = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT DISTINCT ON (vw."drugName")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
            )) vaccines;
        `);
        const totalDrugnames = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
            )) vaccines;
        `);
        const count = drugNameCount[0][0].count;
        const total = totalDrugnames[0][0].count;
        if ( count > 0 ) { 
            const drugNames = await sequelize.query(`
                SELECT DISTINCT ON (vw."drugName")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                )
                ORDER BY vw."drugName" ASC;
            `);
            return res.status(200).json({
                ok: true,
                count,
                total,
                drugNames: drugNames[0]
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No Drug names found for the specified country'
            });
        }
    } catch (error) {
        console.log('Error fetching drug names:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
};

const getMaHolder = async ( req = request, res = response ) => {
    const country = req.query.country || '';
    const abbreviation = req.query.abbreviation || '';
    const drugName = req.query.drugName || '';
    try {
        const maHoldersCount = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT DISTINCT ON (vw."maHolders")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
            )) vaccines;
        `);
        const totalMaHolders = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
            )) vaccines;
        `);
        const count = maHoldersCount[0][0].count;
        const total = totalMaHolders[0][0].count;
        if ( count > 0 ) { 
            const maHolders = await sequelize.query(`
                SELECT DISTINCT ON (vw."maHolders")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                )
                ORDER BY vw."maHolders" ASC;
            `);
            return res.status(200).json({
                ok: true,
                count,
                total,
                maHolders: maHolders[0]
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No Drug names found for the specified country'
            });
        }
    } catch (error) {
        console.log('Error fetching drug names:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
};

const getForms = async ( req = request, res = response ) => {
    const country = req.query.country || '';
    const abbreviation = req.query.abbreviation || '';
    const drugName = req.query.drugName || '';
    const maHolders = req.query.maHolders || '';
    try {
        const formsCount = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT DISTINCT ON (vw."formTranslations")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
            )) vaccines;
        `);
        const totalForms = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
            )) vaccines;
        `);
        const count = formsCount[0][0].count;
        const total = totalForms[0][0].count;
        if ( count > 0 ) { 
            const forms = await sequelize.query(`
                SELECT DISTINCT ON (vw."formTranslations")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                )
                ORDER BY vw."formTranslations" ASC;
            `);
            return res.status(200).json({
                ok: true,
                count,
                total,
                forms: forms[0]
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No Drug names found for the specified country'
            });
        }
    } catch (error) {
        console.log('Error fetching drug names:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
};

const getStrength = async ( req = request, res = response ) => {
    const country = req.query.country || '';
    const abbreviation = req.query.abbreviation || '';
    const drugName = req.query.drugName || '';
    const maHolders = req.query.maHolders || '';
    const forms = req.query.forms || '';
    try {
        const strengthCount = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT DISTINCT ON (vw."strength")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    AND vw."formTranslations" = '${forms}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    AND vw."formTranslations" = '${forms}'
            )) vaccines;
        `);
        const totalStrength = await sequelize.query(`
            SELECT COUNT (*)
                FROM (
                SELECT *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    AND vw."formTranslations" = '${forms}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    AND vw."formTranslations" = '${forms}'
            )) vaccines;
        `);
        const count = strengthCount[0][0].count;
        const total = totalStrength[0][0].count;
        if ( count > 0 ) { 
            const strengths = await sequelize.query(`
                SELECT DISTINCT ON (vw."strength")
                    *
                FROM "vaccinesWhodrug" vw 
                WHERE (
                    vw."iso3Code" = '${country}'
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    AND vw."formTranslations" = '${forms}'
                    )
                OR (
                    vw."iso3Code" is null
                    AND vw."language" = 'es'
                    AND vw."isPreferred" = 1
                    AND vw.abbreviation = '${abbreviation}'
                    AND vw."drugName" = '${drugName}'
                    AND vw."maHolders" = '${maHolders}'
                    AND vw."formTranslations" = '${forms}'
                )
                ORDER BY vw."strength" ASC;
            `);
            return res.status(200).json({
                ok: true,
                count,
                total,
                strengths: strengths[0]
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No Drug names found for the specified country'
            });
        }
    } catch (error) {
        console.log('Error fetching drug names:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
};

const getInfoById = async ( req = request, res = response ) => {
    const id = req.params.id;
    try {
        const vaccineInfo = await VaccinesWhoDrug.findByPk( id );
        if ( !vaccineInfo ) {
            return res.status(404).json({
                ok: false,
                msg: `No vaccine information found with id ${ id }`
            });
        }
        return res.status(200).json({
            ok: true,
            vaccineInfo
        });
    } catch (error) {
        console.log('Error fetching vaccine information by ID:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }

}

module.exports = {
    getAbbreviations,
    getDrugName,
    getMaHolder,
    getForms,
    getStrength,
    getInfoById
};