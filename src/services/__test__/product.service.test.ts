import { ProductService } from "../index";
import { Product, Provider, Category } from 'models/index';
import mongoose from 'mongoose';
import DB from "../../config/database";
import { category } from '../../models/category';

describe("ProductService", () => {
  let database: DB;
  let productService: ProductService;
  let provider: any;
  let provider2: any;
  let category: any;
  let category2: any;

  beforeAll(async () => {
    productService = new ProductService();
    database = new DB(true);
    await database.connect();

    // Create a provider
    provider = new Provider({
      name: "Provider",
      type: "individual",
      contactInfo: {
        email: "provider@email.com",
        phone: "123456789"
      },
      address: "Provider address",
      link: "http://provider.com"
    });

    provider2 = new Provider({
          name: "Provider2",
          type: "individual",
          contactInfo: {
            email: "provider2@email.com",
            phone: "1234567892"
          },
          address: "Provider2 address",
          link: "http://provider.com"
        });

    await provider.save();
    await provider2.save();

    // Create a category
    category = new Category({
      name: "Category",
      description: "Category description"
    });

          category2 = new Category({
            name: "Category2",
            description: "Category description 2"
          });

    await category.save();
    await category2.save();

  });

  afterAll(async () => {
    await database.drop();
    await database.disconnect();
  });

  // Describe block for product creation tests
  describe("Product Creation Tests", () => {

          afterAll(async () => {
                    await Product.deleteMany({});
          });
          it("should create a product", async () => {
          const product = {
          name: "Product",
          description: "Product description",
          price: 1000,
          vat: 10,
          category: category._id,
          provider: provider._id
          };

          const newProduct = await productService.createProduct(product);
          expect(newProduct).toHaveProperty("_id");
          expect(newProduct).toHaveProperty("name", "Product");
          expect(newProduct).toHaveProperty("description", "Product description");
          expect(newProduct).toHaveProperty("price", 1000);
          expect(newProduct).toHaveProperty("vat", 10);
          expect(newProduct).toHaveProperty("category", category._id);
          expect(newProduct).toHaveProperty("provider", provider._id);
          });

          it("should raise an error if the product price is less than 0", async () => {
            const product = {
          name: "Product",
          description: "Product description",
          price: -1000,
          vat: 10,
          category: category._id,
          provider: provider._id
            };
          
            await expect(productService.createProduct(product)).rejects.toThrow('Product validation failed: price: Price must be greater than 0');
          });

          it("should raise an error if the product vat is less than 0", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: -10,
                              category: category._id,
                              provider: provider._id
                                };

           await expect(productService.createProduct(product)).rejects.toThrow('Product validation failed: vat: Vat must be greater than 0');
                                              });

          it("should raise an error if the product vat is greater than 100", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 101,
                              category: category._id,
                              provider: provider._id
                                };

           await expect(productService.createProduct(product)).rejects.toThrow('Product validation failed: vat: Vat must be less than 100');
                                              });

          it("should raise an error if the category does not exist", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 10,
                              category: new mongoose.Types.ObjectId(),
                              provider: provider._id
                                };


          await expect(productService.createProduct(product)).rejects.toThrow('Category does not exist');
       
                                              
           });

           it ("should raise an error if the provider does not exist", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 10,
                              category: category._id,
                              provider: new mongoose.Types.ObjectId()
                                };

          await expect(productService.createProduct(product)).rejects.toThrow('Provider does not exist');



                              });





          

       

          it("should create user with populated category and provider", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 10,
                              category: category._id,
                              provider: provider._id
                                };

          const newProduct = await productService.createProduct(product , true , [["category","name"], ["provider", "name"]]);
          expect(newProduct).toHaveProperty("provider");
          expect(newProduct.category).toHaveProperty("name", "Category");
          expect(newProduct.provider).toHaveProperty("name", "Provider");
          
          }
          );
});

describe("Product gets Tests", () => {

                    beforeAll(async () => {
                           await Product.deleteMany({});
                           for(let i = 0; i < 10; i++){
                                          const product = new Product({
                                                       name: "Product"+i,
                                                       description: "Product description"+i,
                                                       price: 1000+i,
                                                       vat: 10+i,
                                                       category: category._id,
                                                       provider: provider._id
                                          });
          
                                          await product.save();
                                    }
                    });

                    afterAll(async () => {
                              await Product.deleteMany({});
                    });

                    



                    it("should get all products", async () => {

                              const products = await productService.getProducts();
                              expect(products).toHaveLength(10);
                              expect(products[0]).toHaveProperty("name", "Product0");
                              expect(products[0]).toHaveProperty("description", "Product description0");
                              expect(products[0]).toHaveProperty("price", 1000);
                              expect(products[0]).toHaveProperty("vat", 10);
                              expect(products[0]).toHaveProperty("category", category._id);
                              expect(products[0]).toHaveProperty("provider", provider._id);
                    });
                             

                    it("should get a product by id", async () => {
                              const products = await productService.getProducts();
                              const product = await productService.getProductById(products[0]._id);
                             
                              expect(product).toHaveProperty("name", "Product0");
                              expect(product).toHaveProperty("description", "Product description0");
                              expect(product).toHaveProperty("price", 1000);
                              expect(product).toHaveProperty("vat", 10);
                              expect(product).toHaveProperty("category", category._id);
                              expect(product).toHaveProperty("provider", provider._id);
                      
                    });

                    it("should get a product by id with populated category and provider", async () => {
                              const products = await productService.getProducts();
                              const product = await productService.getProductById(products[0]._id, true ,[["category","name"], ["provider", "name"]]);
                              console.log(product);
                              expect(product).toHaveProperty("name", "Product0");
                              expect(product).toHaveProperty("description", "Product description0");
                              expect(product).toHaveProperty("price", 1000);
                              expect(product).toHaveProperty("vat", 10);
                              expect(product.category).toHaveProperty("_id", category._id);
                              expect(product.provider).toHaveProperty("_id", provider._id);
                              expect(product.category).toHaveProperty("name", "Category");
                              expect(product.provider).toHaveProperty("name", "Provider");
                    });

                    it("should raise an error if the product does not exist", async () => {
                              await expect(productService.getProductById((new mongoose.Types.ObjectId()).toString())).resolves.toBeNull();                  });

                    });
                  
describe("Product Update Tests", () => {
          afterAll(async () => {
                    await Product.deleteMany({});
          });

          it("should update a product", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 10,
                              category: category._id,
                              provider: provider._id
                                };

          const newProduct = await productService.createProduct(product);
          const updatedProduct = await productService.updateProduct(newProduct._id, {name: "Updated Product"});
          expect(updatedProduct).toHaveProperty("name", "Updated Product");
          
          });

          });

          it("should update a product with populated category and provider", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 10,
                              category: category._id,
                              provider: provider._id
                                };

          const newProduct = await productService.createProduct(product);
          const updatedProduct = await productService.updateProduct(newProduct._id, {name: "Updated Product"}, true, [["category","name"], ["provider", "name"]]);

          expect(updatedProduct).toHaveProperty("name", "Updated Product");
          expect(updatedProduct).toHaveProperty("provider");
          expect(updatedProduct.category).toHaveProperty("name", "Category");
          expect(updatedProduct.provider).toHaveProperty("name", "Provider");
          }
          );

          it("should return null if the product does not exist", async () => {
                    await expect(productService.updateProduct((new mongoose.Types.ObjectId()).toString(), {name: "Updated Product"})).resolves.toBeNull();
          });
describe("Product Deletion Tests", () => {

          beforeAll(async () => {
                    await Product.deleteMany({});
                 
          });

          it("should delete a product", async () => {
                    const product = {
                              name: "Product D",
                              description: "Product description D",
                              price: 1000,
                              vat: 10,
                              category: category._id,
                              provider: provider._id
                                };
          
          const newProduct = await productService.createProduct(product);

          await productService.deleteProduct(newProduct._id);
          const products = await productService.getProducts();
          expect(products).toHaveLength(0);
          });

          it("should return null if the product does not exist", async () => {
                    await expect(productService.deleteProduct((new mongoose.Types.ObjectId()).toString())).resolves.toBeNull();
          });

});



});





