import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastname'
    },
    location: {
        type: String,
        default: 'my-city'
    },
    role: {
        type: String,
        enum: ['user' , 'admin'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String,
})

//basically jb hume kabhi db mai store user ki info chayiye hogi toh hum ussme se password hta kr denge!..
//just ek function hai jo get api mai invoke hoga
UserSchema.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model('User' , UserSchema);