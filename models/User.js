const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    nome : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required:true,
        unique : true
    },
    senha : {
        type : String,
    },
    role: { type: String, required: true, enum: ['client', 'admin'], default: 'admin' }
}, {timestamps: true});

const User = mongoose.model('User',UserSchema);
module.exports = {
    User
};
