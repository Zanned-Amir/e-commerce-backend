import { Request, Response, NextFunction } from 'express';

const cleanRequest =  (allowedFields: string[]) => {
          return (req: Request, res: Response, next: NextFunction) => {
                    const bodyKeys = Object.keys(req.body);
                    bodyKeys.forEach((key) => {
                    if (!allowedFields.includes(key)) {
                    delete req.body[key];  
                    }
                    });
                    next();

           };
}

export default cleanRequest;
