const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 3005;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
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
