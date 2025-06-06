const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            console.log('Database connected!');
            return callback(null, database);
        })
        .catch((err) => {
            console.log('Database connection failed!');
            return callback(err);
        });
}

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized!');
    }
    return database;
}

module.exports = {
    initDb,
    getDatabase
};