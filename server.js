const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

const Order = require('./models/Order');

// Connect to MongoDB
const DB_URI = "mongodb+srv://hanisikasiva:v6JROwSzsXRukAY4@cluster0.zd36cxe.mongodb.net/orderform?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  family: 4,
})
.then(() => {
  console.log("✅ Connected to MongoDB successfully!");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Routes
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.json(saved);
  } catch (error) {
    console.error(' Error while saving order:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🛠️ Login Attempt:", email, password);

  try {
    const user = await User.findOne({ email });
    console.log("🔍 User Found:", user);

    if (!user) {
      console.log("❌ Email not found");
      return res.status(401).json({ message: 'Invalid email' });
    }

    if (user.password !== password) {
      console.log("❌ Password does not match");
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log("✅ Login success");
    res.json({ success: true, email: user.email });
  } catch (err) {
    console.error("💥 Server error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.put('/api/orders/:id', async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order Deleted' });
});

// Start Server
app.get('/', (req, res) => {
  res.send('Welcome to the orderform API!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
