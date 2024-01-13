import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    fullname: String,
    googleId: String,
    profilePicture: String
});

const User = mongoose.model('user', userSchema);
export default User;
