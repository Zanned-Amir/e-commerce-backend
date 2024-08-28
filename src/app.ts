import express from 'express';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
const xss = require('xss-clean');




const mongoSanitize = ExpressMongoSanitize();
const app = express();

app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(mongoSanitize)
app.use(xss() );

export default app;


