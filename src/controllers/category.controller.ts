import { Request, Response , NextFunction } from 'express';
import AppError from '../utils/app.error';
import catchAsync from '../utils/catch.async';
import { CategoryService} from '../services/index';  


class CategoryController {

          private _categoryService: CategoryService;
          
          constructor() {
          this._categoryService = new CategoryService();
          }
          
          getAllCategories = catchAsync(async (req: Request, res: Response , next: NextFunction) => {
                    const query = req.query;
                    const categories = await this._categoryService.getCategories(query);
          
          res.status(200).json({
          status: 'success',
          data: categories,
          });
          });
          
          createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const body = req.body;
          const newCategory = await this._categoryService.createCategory(body);
          
          res.status(201).json({
          status: 'success',
          data: newCategory,
          });
          });
          
          getCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const id: string = req.params.id;
          const category = await this._categoryService.getCategoryById(id);
          
          if (!category) {
          throw new AppError('Category not found', 404);
          }
          
          res.status(200).json({
          status: 'success',
          data: category,
          });
          });
          
          updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const id: string = req.params.id;
          const body = req.body;
          const updatedCategory = await this._categoryService.updateCategory(id, body);
          
          res.status(200).json({
          status: 'success',
          data: updatedCategory,
          });
          });

          deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const id: string = req.params.id;
          await this._categoryService.deleteCategory(id);
          res.status(204).json({
          status: 'success',
          data: null,
          });
          });

          countCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const count = await this._categoryService.countCategories();
          res.status(200).json({
          status: 'success',
          data: count,
          });
          });

          deactivateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const id: string = req.params.id;
          await this._categoryService.deactivateCategory(id);
          res.status(204).json({
          status: 'success',
          data: null,
          });
          });

          activateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
          const id: string = req.params.id;
          await this._categoryService.activateCategory(id);
          res.status(204).json({
          status: 'success',
          data: null,
          });
          });



          countFiltredCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

          const query = req.query;
          const count = await this._categoryService.countFilteredCategories(query);
          res.status(200).json({
          status: 'success',
          data: count,
          });
          });

}

export default CategoryController;