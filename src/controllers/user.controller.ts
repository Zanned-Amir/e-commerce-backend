import { Request, Response } from 'express';
import AppError from '../utils/app.error';
import catchAsync from '../utils/catchAsync';
import UserService from '../services/user.service';
import { user } from '../types/user';





export default  class UserController { 

  private _userService: UserService;
  

  constructor() {

    this._userService = new UserService();

  }
          

         getAllUsers = catchAsync(async (req: Request, res: Response) => {

          const { page, sort, limit, fields } = req.query;
          const users = await this._userService.getUsers({ page, sort, limit, fields });

          res.status(200).json({
            status: 'success',
            data: users,
          });
          
         
          
        });

           createUser = catchAsync(async (req: Request, res: Response) => {

            const body: user = req.body;
            const newUser = await this._userService.createUser(body);

            res.status(201).json({
              status: 'success',
              data: newUser,
            });
           
          });

           getUser = catchAsync(async (req: Request, res: Response) => {

            const id: string = req.params.id;
            const user = await this._userService.getUserById(id);

            res.status(200).json({
              status: 'success',
              data: user,
            });
          });

           updateUser = catchAsync(async (req: Request, res: Response) => {

            const id: string = req.params.id;
            const body: user = req.body;
            const updatedUser = await this._userService.updateUser(id, body);

            res.status(200).json({
              status: 'success',
              data: updatedUser,
  
            });
          });

           deleteUser = catchAsync(async (req: Request, res: Response) => {

            const id: string = req.params.id;
            await this._userService.deleteUser(id);

            res.status(204).json({
              status: 'success',
              data: null,
            });

          });

           deactivateUser = catchAsync(async (req: Request, res: Response) => {

            const id: string = req.params.id;
            await this._userService.deactivateUser(id);

            res.status(204).json({
              status: 'success',
              data: null,

            });

                    
                    });

          

}