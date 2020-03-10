import * as mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: String,
    email: String
})

UserSchema.methods.toUI = function() {
    console.log('Instance Methods')
    return this.toObject({versionKey: false});
}

UserSchema.statics.sample = function() {
    console.log('Class Methods');
}

export { UserSchema };