const pgp = require('pg-promise');
const promise = require('bluebird');

const pg = pgp({ promiseLib: promise, noLocking: true });
const db = pg(process.env.DB_URL_DEV);

module.exports = db;
