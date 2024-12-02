const mongoose = require('mongoose');
const User = require('./models/user');

const users = [
{
    email: 'kelly@makers.tech',
    password: '1234',
    username: 'Kelly Howes'
},
{
    email: 'Aaron@makers.tech',
    password: 'AaronPass',
    username: 'Aaron '
},
{
    email: 'Ben@makers.tech',
    password: 'BenPass',
    username: 'Ben'
},
{
    email: 'Naomi@makers.tech',
    password: 'NaomiPass',
    username: 'Naomi'
},
{
    email: 'abc@123.com',
    password: 'KimiPass',
    username: 'Kimiko Dogue'
},
{
    email: '123@abc.com',
    password: 'TwylaPass',
    username: 'Twyla Kitty'
}
];

async function seedDatabase() {
try {
    await mongoose.connect('mongodb://localhost:27017/acebook', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Connected to the database');

    await User.deleteMany({});
    console.log('Existing users deleted');

    await User.insertMany(users);
    console.log('Users inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
    } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
    }
}

// Run the seed function
seedDatabase();
