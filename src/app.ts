import express from 'express';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
const xss = require('xss-clean');
import routes from './routes/index';
import golbalErrorHandler from './controllers/error.controller';


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

app.use('/api/v1', routes);





app.all('*', (req, res ,next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
 
});

app.use(golbalErrorHandler);

export default app;


