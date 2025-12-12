const Sequelize = require('sequelize');

let dialect;
let connect; 

let environment = process.env.API_ENVIRONMENT || 'dev';

if ( environment === 'prod' ) {
    dialect = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
    connect = process.env.PROD_DATABASE_URL;
} else {
    dialect = {};
    connect =  process.env.DEV_DATABASE_URL;
}

// Connection configuration
const sequelize = new Sequelize(connect, {
    dialect: 'postgres',
    protoco: 'postgres',
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000,
        acquire: 1000000
    },
    dialectOptions: dialect,
    logging: false
});

// Database connection function
async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to WHODrug Database has been established successfully.');
    } catch (error) {
        console.log('Cannot connect to WHODrug Databasee', error);
    }
}

// Connection execution
connection();

module.exports = { 
    sequelize
};