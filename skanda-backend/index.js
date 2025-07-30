
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const Property = require('./models/Property');
const User = require('./models/User');
const Course = require('./models/Course');
const EventFeature = require('./models/EventFeature');

const app = express();
app.use(cors());
app.use(express.json());

// --- Course management endpoints (admin only) ---
app.get('/api/admin/courses', authMiddleware('admin'), async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/admin/courses', authMiddleware('admin'), async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/admin/courses/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/admin/courses/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Event Feature management endpoints (admin only) ---
app.get('/api/admin/event-features', authMiddleware('admin'), async (req, res) => {
  try {
    const features = await EventFeature.find();
    res.json(features);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/admin/event-features', authMiddleware('admin'), async (req, res) => {
  try {
    const feature = new EventFeature(req.body);
    await feature.save();
    res.status(201).json(feature);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/admin/event-features/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const feature = await EventFeature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(feature);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/admin/event-features/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await EventFeature.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event feature deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Public endpoints for user access ---
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/event-features', async (req, res) => {
  try {
    const features = await EventFeature.find();
    res.json(features);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// --- All route definitions below this line ---

// Dashboard stats endpoint (admin only)
app.get('/api/admin/dashboard', authMiddleware('admin'), async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const propertyCount = await Property.countDocuments();
    // Add more stats as needed
    res.json({ userCount, propertyCount });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// User management endpoints (admin only)
app.get('/api/admin/users', authMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/users/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/users/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Property management endpoints (admin only)
app.get('/api/admin/properties', authMiddleware('admin'), async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/properties/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(property);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/properties/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Notification endpoint (admin only, simple array for demo)
let notifications = [];
app.post('/api/admin/notifications', authMiddleware('admin'), (req, res) => {
  const { message } = req.body;
  notifications.push({ message, date: new Date() });
  res.json({ message: 'Notification sent' });
});

app.get('/api/admin/notifications', authMiddleware('admin'), (req, res) => {
  res.json(notifications);
});


// Signup endpoint (user)
app.post('/api/signup', async (req, res) => {
  const { name, email, password, phone, service } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, service, role: "user" });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup endpoint (admin)
app.post('/api/admin/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Admin already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: "admin" });
    await user.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Login endpoint (user & admin)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify JWT and role
function authMiddleware(role) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role && decoded.role !== role) return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

// User profile endpoint
app.get('/api/profile', authMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only endpoint example
app.get('/api/admin/users', authMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});


// Property endpoints (public GET, admin POST/PUT/DELETE)
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/properties', authMiddleware('admin'), async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/properties/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(property);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.delete('/api/properties/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));