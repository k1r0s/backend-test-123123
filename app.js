import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';
import fakeData from './config/fakeData';

require('mongoose-schema-jsonschema')(mongoose);

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.Promise = global.Promise;

mongoose.connect(config.get('mongodb.uri'), {
  useNewUrlParser: true,
  connectTimeoutMS: 2147483647,
  useUnifiedTopology: true
});
mongoose.connection.on('error', (err) => {
  throw err;
});
mongoose.connection.on('connected', async () => {
  console.log('MongoDB database connected! Environment:', config.get('entorno'));
  try {
    await fakeData.buildProducts();
    await fakeData.buildDeliveries();
  } catch (e) {
    console.log('MongoDB ensuring indexes FAIL', e);
  }
});


// Routes
import router from './components/router/routes';
router.mountRoutes(app);


// Handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log('Caught exception: %j', err);
});

export default app;
