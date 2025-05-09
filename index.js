const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 3005;
// Middleware to parse JSON requests
app.use(express.json());
const allowedOrigins = ['https://frontend-fw72.onrender.com']; // Replace with your Netlify domain

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE', // Allow methods as needed
  credentials: true, // If your API requires cookies or authorization headers
}));

app.use(require('./routes/UserRoutes'));
app.use(require('./routes/NewCustomer'));
app.use(require('./routes/NewReceipts'));
app.use(require('./routes/NewExpense'));



// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/DataBase")
//     .then(() => console.log("✅ Connected to MongoDB"))
//     .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

const uri = 'mongodb+srv://yogesh123:Yogesh%40123@customerdata.br4kq.mongodb.net/?retryWrites=true&w=majority&appName=customerdata';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri,).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));



app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
