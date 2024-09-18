import express from 'express';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
const xss = require('xss-clean');
import hpp from 'hpp';
import routes from './routes/index';
import golbalErrorHandler from './controllers/error.controller';
import AppError from './utils/app.error';
import swaggerDocs from './utils/swagger';



const mongoSanitize = ExpressMongoSanitize();
const app = express();

app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(mongoSanitize)
app.use(xss());
app.use(hpp());

swaggerDocs(app);


app.use('/api/v1', routes);





app.all('*', (req, res ,next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
 
});

app.use(golbalErrorHandler);

export default app;


