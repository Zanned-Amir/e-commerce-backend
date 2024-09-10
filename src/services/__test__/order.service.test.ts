import {OrderService} from "../index";
import DB from "../../config/database";
import { User , Product , Category ,Provider } from "../../models/index";
import { before } from "node:test";

describe("OrderService", () => {
          let database: DB;
          let orderService: OrderService;
          let user: any;
          let products: any[]; // Note that this should be an array
          let category: any;
          let provider: any;
        
          beforeAll(async () => {
            orderService = new OrderService();
            database = new DB(true);
            
            // Ensure the database is connected before proceeding
            await database.connect();
            console.log("Database connected");
        
            category = await Category.create({
              name: "test",
              description: "test",
            });
        
      
        
            provider = new Provider({
              name: "Provider",
              type: "individual",
              contactInfo: {
                email: "provider@email.com",
                phone: "123456789",
              },
              address: "Provider address",
              link: "http://provider.com",
            });
        
       
        
            await provider.save();
        
            // Add 'await' for the user creation
            user = await User.create({
              username: "test",
              email: "test@gmail.com",
              password: "@passwordA1",
              password_confirm: "@passwordA1",
            });
        
        
        
            for (let i = 0; i < 5; i++) {
              await Product.create({
                name: `Product ${i}`,
                price: 1000,
                discount: 0,
                vat: 0,
                category: category._id,
                provider: provider._id,
                description: "test",
                images: ["test"],
              });
            }
        
            // Fetch all created products and store them in the `products` array
            products = await Product.find({});
          });
        
          afterAll(async () => {
            await database.drop();
            await database.disconnect();
          });
        
          describe("Order Creation Tests", () => {
            it("should create an order", async () => {
              const order = {
                user: user._id,
                address: "test",
                products: [
                  {
                    product: products[0]._id, // Access the first product from the products array
                    quantity: 1,
                    price: 1000,
                    discount: 0,
                  },
                ],
                total: 1000,
          
              };
        
              const newOrder = await orderService.createOrder(order);
              expect(newOrder).toHaveProperty("_id");
              expect(newOrder).toHaveProperty("user", user._id);
              expect(newOrder).toHaveProperty("products");
              expect(newOrder).toHaveProperty("total", 1000);
            });

            it("should raise an error if the order does not contain any product", async () => {
                      const order = {
                    user: user._id,
                    address: "test",
                    products: [],
                    total: 0,
                      };
          
                      await expect(orderService.createOrder(order)).rejects.toThrow("Order must contain at least one product");
                    });
          

          it("should raise an error if the user does not exist", async () => {
                    const order = {
                              user: "60b9e0b7f8f8f3f8c4d4c4e4",
                              address: "test",
                              products: [
                              {
                              product: products[0]._id,
                              quantity: 1,
                              price: 1000,
                              discount: 0,
                              },
                              ],
                              total: 1000,
                              };

           await expect(orderService.createOrder(order)).rejects.toThrow("User does not exist");

        });

        it("should raise an error if the product does not exist", async () => {
          const order = {
            user: user._id,
            address: "test",
            products: [
              {
                product: "60b9e0b7f8f8f3f8c4d4c4e4",
                quantity: 1,
                price: 1000,
                discount: 0,
              },
            ],
            total: 1000,
          };

          await expect(orderService.createOrder(order)).rejects.toThrow("The following products do not exist: 60b9e0b7f8f8f3f8c4d4c4e4");
        });

          it("should raise an error if the product quantity is less than 1", async () => {
            const order = {
              user: user._id,
              address: "test",
              products: [
                {
                    product: products[0]._id,
                    quantity: 0,
                    price: 1000,
                    discount: 0,
                },
              ],
              total: 1000,
            };
          
            await expect(orderService.createOrder(order)).rejects.toThrow("Quantity must be greater than 0");
          });

          

});

describe("Order Retrieval Tests", () => {

          it("should get all orders", async () => {
                    const orders = await orderService.getOrders();
                    expect(orders).toHaveLength(1);
                    });

          it("should get an order by id", async () => {
                    const orders = await orderService.getOrders();
                    const order = await orderService.getOrderById(orders[0]._id);
                    expect(order).toHaveProperty("user", user._id);

                    });



          it("should  populate & get an order by id", async () => {

                              const orders = await orderService.getOrders();
                              const order = await orderService.getOrderById(orders[0]._id, true, [["products.product", "name"]]);
                              expect(order).toHaveProperty("user", user._id);
                              expect(order).toHaveProperty("products");
                              expect(order).toHaveProperty("total", 1000);
                              console.log(order);
                           

                     });

         
          it("should return null if the order does not exist", async () => {
                    await expect(orderService.getOrderById("60b9e0b7f8f8f3f8c4d4c4e4")).resolves.toBeNull();
                    });
          
          
          

});

          describe("Order Update Tests", () => {
            let order : any;

            beforeAll(async () => {
               order = {
                user: user._id,
                address: "test",
                products: [
                  {
                    product: products[0]._id,
                    quantity: 1,
                    price: 1000,
                    discount: 0,
                  },
                ],
                total: 1000,
              };

              order = await orderService.createOrder(order);
            });

                    it("should update an order", async () => {
                              const orders = await orderService.getOrders();
                              const order = await orderService.updateOrder(orders[0]._id, { total: 2000 });
                              expect(order).toHaveProperty("total", 2000);
                              });

                              it("should raise an error if the order does not exist", async () => {
                                        await expect(orderService.updateOrder("60b9e0b7f8f8f3f8c4d4c4e4", { total: 2000 })).resolves.toBeNull();
                                        });

                                        //TODO fix it later 
                  it.skip("should raise an error if the order does not contain any product", async () => {
                           
                              
                            
                              
                              await  expect(orderService.updateOrder(order._id, { products: [] })).rejects.toThrow("Order must contain at least one product");
                              });



                                        

          
          });


          describe("Order Deletion Tests", () => {

                    it("should delete an order", async () => {
                              const orders = await orderService.getOrders();
                              const order = await orderService.deleteOrder(orders[0]._id);
                              expect(order).toHaveProperty("_id", orders
                              [0]._id);
                              });

                              it("should raise an error if the order does not exist", async () => {
                                        await expect(orderService.deleteOrder("60b9e0b7f8f8f3f8c4d4c4e4")).resolves.toBeNull();
                                        });

          });

        
        

});
          
        

