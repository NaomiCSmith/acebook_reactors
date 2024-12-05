const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post')
const Comment = require('./models/comment')

function getRandomDate(startDate, endDate) {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const randomTime = Math.floor(Math.random() * (end - start + 1)) + start;
    return new Date(randomTime);
}

async function seedDatabase() {
    await mongoose.connect('mongodb://localhost:27017/acebook', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const userData = [
    {
        email: 'kelly@makers.tech',
        password: 'KellyPass',
        username: 'Kelly',
        photo: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733386868/profile_photos/zbsfsqpb3ct2vdpwq1fx.jpg"
    },
    {
        email: 'Aaron@makers.tech',
        password: 'AaronPass',
        username: 'Aaron ',
        photo: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733386989/profile_photos/taorilq2rlewycbu20uz.png"
    },
    {
        email: 'Ben@makers.tech',
        password: 'BenPass',
        username: 'Ben',
        photo: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733387039/profile_photos/tlyrhcmwdwm0tzxm15aa.jpg"
    },
    {
        email: 'Naomi@makers.tech',
        password: 'NaomiPass',
        username: 'Naomi',
        photo: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733387092/profile_photos/lljgd71g9x2jz4lvhd5x.jpg"
    },
    {
        email: 'abc@123.com',
        password: 'KimiPass',
        username: 'Kimiko',
        photo: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733387287/profile_photos/gyegqhx9umua6rjzjd5j.jpg"
    },
    {
        email: '123@abc.com',
        password: 'TwylaPass',
        username: 'Twyla',
        photo: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733387336/profile_photos/qoj3xrxiuzlxylirg0ta.jpg"
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
                message: "Let today be the start of something incredible! Keep dreaming, keep believing. #MondayMotivation #DreamBig #BelieveInYourself",
                userId: users[0]._id.toString(),
                likes: 3,
                image: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733395964/posts/k127hhhweuyx9det76ad.png",
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
            }, 
            {
                message: "I've been thinking a lot about dreams lately. It's so easy to get caught up in the hustle, but remembering why you started is what keeps you going.Today, I'm focusing on believing in the bigger picture and trusting the process. Keep pushing! #StayInspired #DreamsInProgress #PersonalGrowth",
                userId: users[1]._id.toString(),
                likes: 5,
                image: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733395289/posts/i5wvnbohtjldphjchtew.png",
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
            }, 
            {
                message: "Just bought the coziest sweater for this chilly season! There's nothing like finding the perfect piece to make you feel warm and confident. Can't wait to wear it all week! Do you have a favorite winter staple? Let me know! #CozyVibes #WinterStyle #FeelingGood",
                userId: users[2]._id.toString(),
                likes: 7,
                image: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733394845/posts/hciskdxqnjzmifk4h8ob.png",
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
            },
            {
                message: "I'm curious: What's your ultimate comfort food when the weather turns cold? For me, it's a bowl of homemade soup and a slice of warm bread. Drop your answer, I need some new ideas for my next cozy day! #ComfortFood #ColdWeatherFavorites",
                userId: users[3]._id.toString(),
                likes: 4,
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
            },
            {
                message: "Super excited to announce I'll be speaking at a webinar next week on 'Harnessing Innovation for Future Success' I've been working on this for a while and can't wait to share my insights. It's free, and I'd love for you to join me!#PersonalGrowth #InnovationJourney #PublicSpeaking #LearningTogether",
                userId: users[4]._id.toString(),
                likes: 5,
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
            },
            {
                message: "Feeling incredibly lucky to be spending this holiday at a stunning lakehouse, where every sunrise brings a new breathtaking view!",
                userId: users[5]._id.toString(),
                likes: 6,
                image: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733415767/posts/ca7mqhximjtajbxxrn9c.jpg",
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
            }, 
            {
                message: "Starting the day off right with the most delicious breakfast spread—perfectly cooked eggs, fresh fruit, and golden, crispy waffles that are almost too beautiful to eat! 🧇🍳🍓 #BreakfastGoals #MorningBliss #FoodieHeaven",
                userId: users[0]._id.toString(),
                likes: 4,
                image: "https://res.cloudinary.com/depvdk2lj/image/upload/v1733416424/posts/qacm8tuh5tr522ydckxw.jpg",
                createdAt: getRandomDate(new Date('2024-11-25'), new Date('2024-12-01'))
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
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[0]._id.toString(),
                userId: users[1]._id.toString(),
                message: "Love this quote! Every small step counts, and today is the perfect day to start. Let's go! #OneDayAtATime #DreamChasers",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[0]._id.toString(),
                userId: users[4]._id.toString(),
                message: "Beautifully said! It's amazing how far a little belief can take you. Here's to chasing dreams and making them reality!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[2]._id.toString(),
                message: "This really resonates with me. It's so easy to lose sight of the bigger picture, but remembering the 'why' is everything. Thanks for the reminder!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[4]._id.toString(),
                message: "Trusting the process is the hardest part, but it's always worth it. You've got this!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[3]._id.toString(),
                message: "Such a powerful message! The hustle can be overwhelming, but pausing to reflect is where the magic happens.",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[0]._id.toString(),
                message: "Love this! Progress may be slow, but every step counts. Proud of you for keeping the faith!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[1]._id.toString(),
                userId: users[5]._id.toString(),
                message: "I needed to hear this today. Sometimes, it's about taking a deep breath and trusting that everything will align.",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[2]._id.toString(),
                userId: users[4]._id.toString(),
                message: "A cozy sweater is a winter must-have! Mine's a chunky knit cardigan that feels like a warm hug.",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[2]._id.toString(),
                userId: users[3]._id.toString(),
                message: "There's nothing better than finding the perfect sweater! Pair it with some fuzzy socks, and you're set for the season!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[2]._id.toString(),
                userId: users[1]._id.toString(),
                message: "Yes! A good sweater is a game-changer. I can't survive winter without my oversized scarf.",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[3]._id.toString(),
                userId: users[5]._id.toString(),
                message: "Homemade soup and bread sound perfect! For me, it's all about a big bowl of creamy mac and cheese. Nothing beats that cozy, cheesy goodness!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[3]._id.toString(),
                userId: users[2]._id.toString(),
                message: "Yum! For me, it's a classic: chili with cornbread. Spicy, hearty, and perfect for cold nights!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[5]._id.toString(),
                message: "Congratulations! 🎉 Can't wait to hear your insights—this sounds like an amazing opportunity. Count me in!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[3]._id.toString(),
                message: "Wow, this is so exciting! You've worked so hard for this, and I know it's going to be incredible. Looking forward to it! 🙌✨",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[1]._id.toString(),
                message: "This topic is so relevant right now! I'm excited to learn from your experience. Thanks for sharing your knowledge with us!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[0]._id.toString(),
                message: "Amazing news! Public speaking is no easy feat, but I know you'll nail it. Can't wait to tune in!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[4]._id.toString(),
                userId: users[2]._id.toString(),
                message: "I'm so proud of you! Your dedication to growth and innovation is inspiring. I'll definitely be joining!💻",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[5]._id.toString(),
                userId: users[1]._id.toString(),
                message: "Wow, this place looks like paradise! You're living the dream! 🌅✨",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[5]._id.toString(),
                userId: users[4]._id.toString(),
                message: "The view alone is worth a thousand holidays! Enjoy every second of it! 😍",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[5]._id.toString(),
                userId: users[2]._id.toString(),
                message: "I'm officially jealous—this looks like the perfect escape! Have an amazing time!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[5]._id.toString(),
                userId: users[3]._id.toString(),
                message: "This is what holiday dreams are made of! Can't wait to hear all about it when you're back!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            }, 
            {
                postId: posts[6]._id.toString(),
                userId: users[3]._id.toString(),
                message: "This looks like the perfect way to start the day! I need those waffles in my life! 😍🧇",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            },
            {
                postId: posts[6]._id.toString(),
                userId: users[1]._id.toString(),
                message: "How do I get an invite to this breakfast? Everything looks amazing! 🍓",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
            },
            {
                postId: posts[6]._id.toString(),
                userId: users[5]._id.toString(),
                message: "I can almost taste those waffles through the screen! Now that's what I call a dream breakfast!",
                createdAt: getRandomDate(new Date('2024-12-02'), new Date())
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
