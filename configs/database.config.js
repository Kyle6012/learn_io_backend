// eslint-disable-next-line max-len
const mongoose = require('mongoose');
const envUtils = require('../common/envUtils');
const logger = require('../common/logger');

const connectDB = async() => {
    try {
        const mongoURI = envUtils.get('DATABASE_URL', true);
        const clientOptions = {
            serverApi: { version: '1', strict: true, deprecationErrors: true },
        };

        await mongoose.connect(mongoURI, clientOptions);
    } catch (error) {
        logger.error(`Failed to connect to MongoDB: ${error.message}`);
        await mongoose.disconnect();
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected successfully!');
});

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB disconnected.');
});

module.exports = connectDB;