import mongoose from 'mongoose';

mongoose.Promise = Promise;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'drive-yello-api';
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useMongoClient: true, });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function callback() {
  console.log(`Connection with database succeeded: mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
});

export default mongoose;