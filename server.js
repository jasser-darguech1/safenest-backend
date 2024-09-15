const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/properties');
require('dotenv').config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully!');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Properties API!');
});

// Use property routes
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
