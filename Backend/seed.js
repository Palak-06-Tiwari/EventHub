const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const OTP = require('./models/OTP');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB connection open...');

        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        await Booking.deleteMany({});
        await OTP.deleteMany({});

        console.log('🗑️ Cleared existing data.');

        // Password for dummy users
        const hashedPassword = await bcrypt.hash('123456', 10);

        // Create users
        const users = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@eventhub.com',
                password: hashedPassword,
                role: 'admin',
                otp: true
            },
            {
                name: 'Rahul Sharma',
                email: 'rahul@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Priya Singh',
                email: 'priya@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Aman Verma',
                email: 'aman@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Neha Gupta',
                email: 'neha@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Rohit Mehta',
                email: 'rohit@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Anjali Patel',
                email: 'anjali@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Karan Joshi',
                email: 'karan@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Sneha Kapoor',
                email: 'sneha@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            },
            {
                name: 'Vikas Yadav',
                email: 'vikas@example.com',
                password: hashedPassword,
                role: 'user',
                otp: true
            }
        ]);

        console.log(`👤 Created ${users.length} total dummy users.`);

        // Admin user
        const adminUser = users[0];

        // Create events
        const events = await Event.insertMany([
            {
                title: 'Tech Innovation Summit 2026',
                description:
                    'A technology summit featuring AI, cloud computing, cybersecurity and modern software development.',
                date: new Date('2026-10-10T10:00:00'),
                location: 'Bhopal',
                category: 'Technology',
                totalSeats: 200,
                availableSeats: 200,
                ticketPrice: 799,
                imageUrl:
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
                createdBy: adminUser._id
            },

            {
                title: 'AI & Machine Learning Workshop',
                description:
                    'Hands-on workshop covering Artificial Intelligence, Machine Learning and Generative AI.',
                date: new Date('2026-10-18T11:00:00'),
                location: 'Indore',
                category: 'AI',
                totalSeats: 100,
                availableSeats: 100,
                ticketPrice: 599,
                imageUrl:
                    'https://images.unsplash.com/photo-1555255707-c07966088b7b',
                createdBy: adminUser._id
            },

            {
                title: 'Startup & Entrepreneurship Meetup',
                description:
                    'Meet entrepreneurs, founders and aspiring startup builders and learn about building successful businesses.',
                date: new Date('2026-10-25T14:00:00'),
                location: 'Bhopal',
                category: 'Business',
                totalSeats: 150,
                availableSeats: 150,
                ticketPrice: 399,
                imageUrl:
                    'https://images.unsplash.com/photo-1556761175-b413da4baf72',
                createdBy: adminUser._id
            },

            {
                title: 'Web Development Bootcamp',
                description:
                    'Learn full-stack web development using modern frontend and backend technologies.',
                date: new Date('2026-11-02T09:30:00'),
                location: 'Indore',
                category: 'Development',
                totalSeats: 120,
                availableSeats: 120,
                ticketPrice: 699,
                imageUrl:
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                createdBy: adminUser._id
            },

            {
                title: 'Music Festival 2026',
                description:
                    'An exciting live music festival featuring multiple artists and performances.',
                date: new Date('2026-11-08T18:00:00'),
                location: 'Bhopal',
                category: 'Music',
                totalSeats: 500,
                availableSeats: 500,
                ticketPrice: 999,
                imageUrl:
                    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
                createdBy: adminUser._id
            },

            {
                title: 'Photography Exhibition',
                description:
                    'Explore creative photography from talented photographers and artists.',
                date: new Date('2026-11-15T12:00:00'),
                location: 'Bhopal',
                category: 'Art',
                totalSeats: 80,
                availableSeats: 80,
                ticketPrice: 299,
                imageUrl:
                    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
                createdBy: adminUser._id
            },

            {
                title: 'Cybersecurity Awareness Conference',
                description:
                    'Learn about cybersecurity, online privacy, ethical hacking and digital safety.',
                date: new Date('2026-11-22T10:00:00'),
                location: 'Indore',
                category: 'Cybersecurity',
                totalSeats: 180,
                availableSeats: 180,
                ticketPrice: 499,
                imageUrl:
                    'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
                createdBy: adminUser._id
            },

            {
                title: 'College Cultural Fest',
                description:
                    'A fun-filled cultural event featuring dance, music, competitions and entertainment.',
                date: new Date('2026-12-01T10:00:00'),
                location: 'Bhopal',
                category: 'Cultural',
                totalSeats: 300,
                availableSeats: 300,
                ticketPrice: 199,
                imageUrl:
                    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce',
                createdBy: adminUser._id
            }
        ]);

        console.log(`🎫 Created ${events.length} events.`);

        console.log('');
        console.log('====================================');
        console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
        console.log('====================================');
        console.log('');
        console.log('Admin Login:');
        console.log('Email: admin@eventhub.com');
        console.log('Password: 123456');
        console.log('');
        console.log('Dummy User Login:');
        console.log('Email: rahul@example.com');
        console.log('Password: 123456');
        console.log('');

        // Close database connection
        await mongoose.connection.close();

        console.log('🔌 MongoDB connection closed.');

    } catch (error) {
        console.error('❌ Error seeding data:', error);

        // Close connection if error occurs
        await mongoose.connection.close();
    }
};

seedDatabase();