const { createHmac, randomBytes } = require('crypto');
const { Schema , model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
    salt: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}
,{timestamps: true});

userSchema.pre("save", function(next) {
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
});

userSchema.static('matchpass',function (email, password) {
    return this.findOne({ email });
        if (!user) 
            return false;

        const salt = user.salt;
        const hashedPassword = user.password;

        const userProvidedHash= createHmac('sha256', salt).update(password).digest('hex');
        return {...user, password: undefined, salt:undefined};
        

const User = model('User', userSchema);

module.exports = User;  