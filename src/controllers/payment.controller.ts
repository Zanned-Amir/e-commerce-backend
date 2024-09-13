import { Request, Response ,NextFunction} from 'express';
import  catchAsync  from '../utils/catch.async';
import { PaymentService } from '../services/index';
import AppError from '../utils/app.error';

class PaymentController {

          private _paymentService: PaymentService;

          constructor() {
                    this._paymentService = new PaymentService();
                    }

          getAllPayments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              
                              const query = req.query;
                              const payments = await this._paymentService.getPayments(query);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: payments,
                              });
                    });

          createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const body = req.body;
                              const newPayment = await this._paymentService.createPayment(body);
          
                              res.status(201).json({
                                        status: 'success',
                                        data: newPayment,
                              });
                    });

          getPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const payment = await this._paymentService.getPaymentById(id);
          
                              if (!payment) {
                                        throw new AppError('Payment not found', 404);
                              }
          
                              res.status(200).json({
                                        status: 'success',
                                        data: payment,
                              });
                    });

          updatePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const body = req.body;
                              const updatedPayment = await this._paymentService.updatePayment(id, body);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedPayment,
                              });
                    });

          updatePaymentStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const status: string = req.body.status;
                            
                              const updatedPayment = await this._paymentService.updatePaymentStatus(id, status);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedPayment,
                              });
                    });

          deletePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
                              const id: string = req.params.id;
                              const deletedPayment = await this._paymentService.deletePayment(id);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: deletedPayment,
                              });
                    });

       



}

export default PaymentController;