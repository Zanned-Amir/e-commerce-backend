import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


class Database {
          private DB: string;

          constructor(test: boolean = false) {
                    this.DB = process.env.DATABASE_LOCAL as string;
                    /*
                    if (process.env.NODE_ENV === "production") {
                              this.DB = process.env.DATABASE
                                        ?.replace("<PASSWORD>", process.env.DATABASE_PASSWORD as string)
                                         .replace("<DB_NAME>",process.env.DATABASE_NAME as string) as string;
                    }
                                         */

                    if (test) {
                              this.DB = process.env.DATABASE_LOCAL_JEST as string;
                    }

                  
                    
        
          }
          
          async connect() {
          try {
                    await mongoose.connect(this.DB);
                              
                   
                              
                              
                              console.log("Database connected successfully");
          } catch (error) {
                    console.log("Database connection failed",error);
          }
          }

          async disconnect() {
                    await mongoose.disconnect();
                    console.log("Database disconnected successfully");
          }

          async drop() {
                    await mongoose.connection.dropDatabase();
                    console.log("Database dropped successfully");
          }

          async clean() {
                    const collections = mongoose.connection.collections;
                    for (const key in collections) {
                              const collection = collections[key];
                              await collection.deleteMany({});
                    }
          }
          

 }
export default Database;