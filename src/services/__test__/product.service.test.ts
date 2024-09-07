import { ProductService } from "../index";
import { Product, Provider, Category } from 'models/index';
import mongoose from 'mongoose';
import DB from "../../config/database";

describe("ProductService", () => {
  let database: DB;
  let productService: ProductService;
  let provider: any;
  let category: any;

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

    await provider.save();

    // Create a category
    category = new Category({
      name: "Category",
      description: "Category description"
    });

    await category.save();
  });

  afterAll(async () => {
    await database.drop();
    await database.disconnect();
  });

  // Describe block for product creation tests
  describe("Product Creation Tests", () => {
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





          });

          it("should prevent duplicated product name", async () => {
                    const product = {
                              name: "Product",
                              description: "Product description",
                              price: 1000,
                              vat: 10,
                              category: category._id,
                              provider: provider._id
                                };

          await productService.createProduct(product);

          await expect(productService.createProduct(product)).rejects.toThrow('E11000 duplicate key error collection');
          });

          it("should create user with populated category and provider", async () => {

});