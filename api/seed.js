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
        username: 'Kelly'
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
        username: 'Kimiko'
    },
    {
        email: '123@abc.com',
        password: 'TwylaPass',
        username: 'Twyla'
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

        
        const insertedPosts = await Post.insertMany(posts);
        console.log('Posts seeded');
        return insertedPosts
        }

    async function seedComments(users, posts) {
        await Comment.deleteMany();
        const comments = [
            {
                postId: posts[0]._id.toString(),
                userId: users[3]._id.toString(),
                message: "Needed this reminder today! Time to refocus and keep pushing toward those goals. Let's make it happen! #StayMotivated",
            }, 
            {
                postId: posts[0]._id.toString(),
                userId: users[1]._id.toString(),
                message: "Love this quote! Every small step counts, and today is the perfect day to start. Let's go! #OneDayAtATime #DreamChasers",
            }, 
            {
                postId: posts[0]._id.toString(),
                userId: users[4]._id.toString(),
                message: "Beautifully said! It's amazing how far a little belief can take you. Here's to chasing dreams and making them reality!",
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[2]._id.toString(),
                message: "This really resonates with me. It's so easy to lose sight of the bigger picture, but remembering the 'why' is everything. Thanks for the reminder!",
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[4]._id.toString(),
                message: "Trusting the process is the hardest part, but it's always worth it. You've got this!",
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[3]._id.toString(),
                message: "Such a powerful message! The hustle can be overwhelming, but pausing to reflect is where the magic happens.",
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[0]._id.toString(),
                message: "Love this! Progress may be slow, but every step counts. Proud of you for keeping the faith!",
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[5]._id.toString(),
                message: "I needed to hear this today. Sometimes, it's about taking a deep breath and trusting that everything will align.",
            }, 
            {
                postId: posts[2]._id.toString(),
                userId: users[4]._id.toString(),
                message: "A cozy sweater is a winter must-have! Mine's a chunky knit cardigan that feels like a warm hug.",
            }, 
            {
                postId: posts[2]._id.toString(),
                userId: users[3]._id.toString(),
                message: "There's nothing better than finding the perfect sweater! Pair it with some fuzzy socks, and you're set for the season!",
            }, 
            {
                postId: posts[2]._id.toString(),
                userId: users[1]._id.toString(),
                message: "Yes! A good sweater is a game-changer. I can't survive winter without my oversized scarf.",
            }, 
            {
                postId: posts[3]._id.toString(),
                userId: users[5]._id.toString(),
                message: "Homemade soup and bread sound perfect! For me, it's all about a big bowl of creamy mac and cheese. Nothing beats that cozy, cheesy goodness!",
            }, 
            {
                postId: posts[3]._id.toString(),
                userId: users[2]._id.toString(),
                message: "Yum! For me, it's a classic: chili with cornbread. Spicy, hearty, and perfect for cold nights!",
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[5]._id.toString(),
                message: "Congratulations! 🎉 Can't wait to hear your insights—this sounds like an amazing opportunity. Count me in!",
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[3]._id.toString(),
                message: "Wow, this is so exciting! You've worked so hard for this, and I know it's going to be incredible. Looking forward to it! 🙌✨",
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[1]._id.toString(),
                message: "This topic is so relevant right now! I'm excited to learn from your experience. Thanks for sharing your knowledge with us!",
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[0]._id.toString(),
                message: "Amazing news! Public speaking is no easy feat, but I know you'll nail it. Can't wait to tune in!",
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[2]._id.toString(),
                message: "I'm so proud of you! Your dedication to growth and innovation is inspiring. I'll definitely be joining!💻",
            }, 
        ]

        await Comment.insertMany(comments)
    }
    
    
    
    const users = await seedUsers(); 
    const posts = await seedPosts(users);
    await seedComments(users, posts)
    console.log('Comments seeded');
    
    mongoose.disconnect();
    }
    
    seedDatabase().catch(err => console.error(err));
