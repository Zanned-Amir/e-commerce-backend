import { Request, Response ,NextFunction} from 'express';
import  catchAsync  from '../utils/catch.async';
import { ProductService } from '../services/index';
import AppError from '../utils/app.error';


class ProductController {

          private _productService: ProductService;

          constructor() {
                    this._productService = new ProductService();
                    }

          getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              
                              const query = req.query;
                              const products = await this._productService.getProducts(query);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: products,
                              });
                    });

          createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const body = req.body;
                              const newProduct = await this._productService.createProduct(body);
          
                              res.status(201).json({
                                        status: 'success',
                                        data: newProduct,
                              });
                    });

          getProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const product = await this._productService.getProductById(id);
          
                              if (!product) {
                                        throw new AppError('Product not found', 404);
                              }
          
                              res.status(200).json({
                                        status: 'success',
                                        data: product,
                              });
                    });

          updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const body = req.body;
                              const updatedProduct = await this._productService.updateProduct(id, body);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedProduct,
                              });
                    });

          deactivateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const deactivatedProduct = await this._productService.deactivateProduct(id);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: deactivatedProduct,
                              });
                    });

          activateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const activatedProduct = await this._productService.activateProduct(id);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: activatedProduct,
                              });
                    });

          deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              await this._productService.deleteProduct(id);
          
                              res.status(204).json({
                                        status: 'success',
                                        data: null,
                              });
                    });

          countProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const count = await this._productService.countProducts();
                              res.status(200).json({
                              status: 'success',
                              data: count,
                              });
                              });




}

export default ProductController;


