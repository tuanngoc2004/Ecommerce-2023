import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mysql from "mysql";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';


//configure env
dotenv.config()

//database config
connectDB();


//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api", authRoutes); // Add a forward slash before "api"
app.use("/api/category", categoryRoutes); // Add a forward slash before "api"
app.use("/api/product", productRoutes); // Add a forward slash before "api"

//rest API
app.get('/', (req, res) => {
    // res.send({
    //     message: 'Welcome to ecommer app'
    // })   
    res.send("<h1>Welcome to ecommer app</h1");
})

// Tạo kết nối
const connection = mysql.createConnection(process.env.GO_URL);

// Kết nối tới cơ sở dữ liệu
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!.');
});


//PORT 
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
});