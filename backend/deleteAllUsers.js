require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const deleteAllUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const result = await User.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} users`);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

deleteAllUsers();