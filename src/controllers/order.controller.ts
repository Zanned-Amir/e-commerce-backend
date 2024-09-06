import { Request, Response } from 'express';
import  catchAsync  from '../utils/catchAsync';
import { OrderService } from '../services/index';
import AppError from '../utils/app.error';


class OrderController {

          private _orderService: OrderService;

          constructor() {
                    this._orderService = new OrderService();
                    }

          getAllOrders = catchAsync(async (req: Request, res: Response) => {
                              
                    const query = req.query;
                    const orders = await this._orderService.getOrders(query);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: orders,
                              });
                    });

          createOrder = catchAsync(async (req: Request, res: Response) => {
                              const body = req.body;
                              const newOrder = await this._orderService.createOrder(body);
          
                              res.status(201).json({
                                        status: 'success',
                                        data: newOrder,
                              });
                    });

          getOrder = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;
                              const order = await this._orderService.getOrderById(id);
          
                              if (!order) {
                                        throw new AppError('Order not found', 404);
                              }
          
                              res.status(200).json({
                                        status: 'success',
                                        data: order,
                              });
                    });

          updateOrder = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;
                              const body = req.body;
                              const updatedOrder = await this._orderService.updateOrder(id, body);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedOrder,
                              });
                    });

          updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
                    
                              const statusList = ['pending', 'completed', 'cancelled'];
                              const id: string = req.params.id;
                              const status: string = req.body.status;

                              if (!statusList.includes(status)) {
                                        throw new AppError('Invalid status', 400);
                              }
                              const updatedOrder = await this._orderService.updateOrderStatus(id, status);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedOrder,
                              });
                    });

          deleteOrder = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;
                              await this._orderService.deleteOrder(id);
          
                              res.status(204).json({
                                        status: 'success',
                                        data: null,
                              });
                    });

          countOrders = catchAsync(async (req: Request, res: Response) => {
                              const count = await this._orderService.countOrders();
                              res.status(200).json({
                              status: 'success',
                              data: count,
                              });
                              });

}

export default OrderController;