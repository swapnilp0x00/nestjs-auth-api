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
    }
})

UserSchema.methods.toUI = function() {
    console.log('Instance Methods')
    return this.toObject({versionKey: false});
}

UserSchema.statics.sample = function() {
    console.log('Class Methods');
}

export { UserSchema };