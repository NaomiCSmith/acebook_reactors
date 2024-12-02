const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post')
const Comment = require('./models/comment')

async function seedDatabase() {
    await mongoose.connect('mongodb://localhost:27017/acebook', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const userData = [
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

    async function seedUsers() {
        await User.deleteMany(); 
        const users = await User.insertMany(userData);
        console.log('Users seeded');
        return users;
    }

    async function seedPosts(users) {
        await Post.deleteMany();
        const posts = [
            {
                message: "'The future belongs to those who believe in the beauty of their dreams.' - Eleanor Roosevelt Let today be the start of something incredible! Keep dreaming, keep believing. #MondayMotivation #DreamBig #BelieveInYourself",
                userId: users[0]._id.toString(),
                likes: 3,
            }, 
            {
                message: "I've been thinking a lot about dreams lately. It's so easy to get caught up in the hustle, but remembering why you started is what keeps you going.Today, I'm focusing on believing in the bigger picture and trusting the process. Keep pushing! #StayInspired #DreamsInProgress #PersonalGrowth",
                userId: users[1]._id.toString(),
                likes: 5,
            }, 
            {
                message: "Just bought the coziest sweater for this chilly season! There's nothing like finding the perfect piece to make you feel warm and confident. Can't wait to wear it all week! Do you have a favorite winter staple? Let me know! #CozyVibes #WinterStyle #FeelingGood",
                userId: users[2]._id.toString(),
                likes: 7,
            },
            {
                message: "I'm curious: What's your ultimate comfort food when the weather turns cold? For me, it's a bowl of homemade soup and a slice of warm bread. Drop your answer, I need some new ideas for my next cozy day! #ComfortFood #ColdWeatherFavorites",
                userId: users[3]._id.toString(),
                likes: 4,
            },
            {
                message: "Super excited to announce I'll be speaking at a webinar next week on 'Harnessing Innovation for Future Success' I've been working on this for a while and can't wait to share my insights. It's free, and I'd love for you to join me!#PersonalGrowth #InnovationJourney #PublicSpeaking #LearningTogether",
                userId: users[4]._id.toString(),
                likes: 5,
            },
        ]

        
        await Post.insertMany(posts);
        console.log('Posts seeded');
        }
    
    
    
    const users = await seedUsers(); 
    await seedPosts(users);
    
    mongoose.disconnect();
    }
    
    seedDatabase().catch(err => console.error(err));
