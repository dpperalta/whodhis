const Sequelize = require('sequelize');
const { sequelize } = require('../database/connection');

const VaccinesWhoDrug = sequelize.define('vaccinesWhodrug', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    drugCode: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    drugRecNo: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    drugRecNoSeq: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    drugName: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    language: {
        type: Sequelize.STRING(10),
    },
    medicinalProductID: {
        type: Sequelize.STRING(50),
    },
    atcs: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    ICD11: {
        type: Sequelize.STRING(10),
    },
    ICD11term: {
        type: Sequelize.STRING(500),
    },
    abbreviation: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    ingredient: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    ingredientTranslations: {
        type: Sequelize.STRING(700),
        allowNull: false
    },
    languageCode: {
        type: Sequelize.STRING(10),
    },
    iso3Code: {
        type: Sequelize.STRING(10),
    },
    countryMedicinalProductID: {
        type: Sequelize.STRING(50),
    },
    maHolders: {
        type: Sequelize.STRING(500),
    },
    maHoldersMedicinalProductID: {
        type: Sequelize.STRING(50),
    },
    form: {
        type: Sequelize.STRING(500),
    },
    formTranslations: {
        type: Sequelize.STRING(700),
    },
    formsMedicinalProductID: {
        type: Sequelize.STRING(50),
    },
    strength: {
        type: Sequelize.STRING(500),
    },
    strengthsMedicinalProductID: {
        type: Sequelize.STRING(50),
    },
    noDoses: {
        type: Sequelize.STRING(500),
    },
    diluent: {
        type: Sequelize.STRING(500),
    },
    isGeneric: {
        type: Sequelize.SMALLINT,
    },
    isPreferred: {
        type: Sequelize.SMALLINT,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = VaccinesWhoDrug;