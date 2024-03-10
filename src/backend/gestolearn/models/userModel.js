import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
    },
    fullname: String,
    profileId: String,
    profilePicture: String,
    provider: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
export default User;