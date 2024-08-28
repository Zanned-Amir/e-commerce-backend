import mongoose from "mongoose";


class Database {
          private DB: string;

          constructor() {
         
          this.DB = process.env.DATABASE
                                        ?.replace("<PASSWORD>", process.env.DATABASE_PASSWORD as string)
                                         .replace("<DB_NAME>",process.env.DATABASE_NAME as string) as string;
          }
          
          async connect() {
          try {
                    await mongoose.connect(this.DB, {

                    });
                    console.log("Database connected successfully");
          } catch (error) {
                    console.log("Database connection failed",error);
          }
          }
 }
export default Database;