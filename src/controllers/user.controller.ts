import { Request, Response , NextFunction } from 'express';
import {AppError ,catchAsync  } from '../utils/index';
import { UserService} from '../services/index';
import { user } from '../types/user';






  class UserController { 

  private _userService: UserService;
  

  constructor() {

    this._userService = new UserService();

  }
          

         getAllUsers = catchAsync(async (req: Request, res: Response , next:NextFunction) => {

          const query = req.query;
          const users = await this._userService.getUsers(query);

          res.status(200).json({
            status: 'success',
            data: users,
          });
          
         
          
        });

           createUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {


              const  body = req.body;

            


            const newUser = await this._userService.createUser(body);

            res.status(201).json({
              status: 'success',
              data: newUser,
            });
           
          });

           getUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {

            const id: string = req.params.id;
            const user = await this._userService.getUserById(id);

            if (!user) {
              throw new AppError('User not found', 404);
            }

            res.status(200).json({
              status: 'success',
              data: user,
            });
          });

           updateUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {

            const id: string = req.params.id;
            const  body = req.body;

            const updatedUser = await this._userService.updateUser(id,body);

            res.status(200).json({
              status: 'success',
              data: updatedUser,
  
            });
          });

           deleteUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {

            const id: string = req.params.id;
            await this._userService.deleteUser(id);

            res.status(204).json({
              status: 'success',
              data: null,
            });

          });

           deactivateUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {

            const id: string = req.params.id;
            await this._userService.deactivateUser(id);

            res.status(204).json({
              status: 'success',
              data: null,

            });

                    
                    });

            activateUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                
                const id: string = req.params.id;
                await this._userService.activateUser(id);
  
                res.status(204).json({
                  status: 'success',
                  data: null,
                });
  
              });

          

}

export default UserController;