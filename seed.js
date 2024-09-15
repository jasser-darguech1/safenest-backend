const mongoose = require('mongoose');
const Property = require('./models/Property');
const propertiesData = require('./data/properties.json');

const mongoURI = 'mongodb+srv://jasser:X5fy57QDWNNSNbcS@cluster0.0fsc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Same as before

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDB = async () => {
  try {
    await Property.deleteMany({});
    await Property.insertMany(propertiesData);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDB();
