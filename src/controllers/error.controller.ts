import AppError from "utils/app.error";
import { Response , Request } from 'express';




const sendErrorDev = (err: AppError,req:Request, res: Response) => {
          res.status(err.statusCode ).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
          });
}

const sendErrorProd = (err: AppError,req:Request, res: Response) => {
          if (err.isOperational) {
            res.status(err.statusCode).json({
              status: err.status,
              message: err.message,
            });
          } else {
            res.status(500).json({
              status: 'error',
              message: 'Something went very wrong!',
            });
          }
}

export default (err: AppError,req:Request, res: Response) => {
          err.statusCode = err.statusCode || 500;
          err.status = err.status || 'error';
          if (process.env.NODE_ENV === 'development') {
            sendErrorDev(err,req,res);
          } else if (process.env.NODE_ENV === 'production') {
            sendErrorProd(err,req,res);
          }
}