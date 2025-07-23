// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Feedback Model
const Feedback = mongoose.model('Feedback', {
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Feedback Submission Endpoint
app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;
    const feedback = new Feedback({ name, email, message, rating });
    await feedback.save();
    res.send('Feedback submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
