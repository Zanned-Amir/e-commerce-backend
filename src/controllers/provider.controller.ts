import { Request, Response , NextFunction} from 'express';
import AppError from '../utils/app.error';
import catchAsync from '../utils/catch.async';
import { ProviderService} from '../services/index'; 

class  ProviderController {

          private _providerService: ProviderService;

          constructor() {
                    this._providerService = new ProviderService();
                    }

          getAllProviders = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                              
                    const query = req.query;
                    const providers = await this._providerService.getProviders(query);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: providers,
                              });
                    });

          createProvider = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                              const body = req.body;
                              const newProvider = await this._providerService.createProvider(body);
          
                              res.status(201).json({
                                        status: 'success',
                                        data: newProvider,
                              });
                    });

          getProvider = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                              const id: string = req.params.id;
                              const provider = await this._providerService.getProviderById(id);
          
                              if (!provider) {
                                        throw new AppError('Provider not found', 404);
                              }
          
                              res.status(200).json({
                                        status: 'success',
                                        data: provider,
                              });
                    });

          updateProvider = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                              const id: string = req.params.id;
                              const body = req.body;
                              const updatedProvider = await this._providerService.updateProvider(id, body);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedProvider,
                              });
                    });

          deleteProvider = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                              const id: string = req.params.id;
                              await this._providerService.deleteProvider(id);
          
                              res.status(204).json({
                                        status: 'success',
                                        data: null,
                              });
                    });

          countProviders = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
                              const count = await this._providerService.countProviders();
                              res.status(200).json({
                              status: 'success',
                              data: count,
                              });
                              });


}

export default  ProviderController;