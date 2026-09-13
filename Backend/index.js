const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const eventRoutes=require('./routes/events.js');
const bookingRoutes=require('./routes/booking.js');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
//routes
app.use('/api/auth', authRoutes);
app.use('/api/events',eventRoutes);
app.use('/api/booking',bookingRoutes);

const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Server start
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });