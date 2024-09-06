import { Request, Response , NextFunction} from 'express';

const filterQuery = (req: Request, res: Response, next: NextFunction, filed : any) => {
  let query = req.query;
  const  acceptedField =filed;
  const queryFields = Object.keys(query);
          queryFields.forEach((field) => {
          if (!acceptedField.includes(field)) {
          delete query[field];
          }
          });
  req.query = query;
  next();
};