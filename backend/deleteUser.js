require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/User');

const deleteUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        const result = await User.deleteOne({ email: 'ramsha@example.com' });

        if (result.deletedCount > 0) {
            console.log('✅ User deleted successfully');
        } else {
            console.log('❌ User not found');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

deleteUser();