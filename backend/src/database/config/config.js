require('dotenv').config();

module.exports = {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'postgres'
};
