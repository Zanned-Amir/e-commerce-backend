import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import  DB from "./config/database";






const database = new DB();
database.connect();
const PORT = process.env.PORT || 3000;


console.log(process.env.node_env);
app.listen(PORT , () => {
          console.log(`Server is running on port ${PORT}`);
         
});










