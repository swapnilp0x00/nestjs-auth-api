import * as mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        enum: ['User', 'Admin']
    }]
})

UserSchema.methods.toUI = function() {
    const object = this.toObject({versionKey: false});
    const {password, ...rest} = object;
    return rest;
}

UserSchema.statics.sample = function() {
    console.log('Class Methods');
}

export { UserSchema };