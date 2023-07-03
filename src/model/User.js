const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    firstname:{
        requiret: [true, "Firstname is Required"],
        type: String,
    },
    lastname:{
        requiret: [true, "Lastname is Required"],
        type: String,
    },
    email:{
        requiret: [true, "Email is Required"],
        type: String,
    },
    password:{
        requiret: [true, "Password is Required"],
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},{
    timestamp: true,
});

//Hash Password

userSchema.pre("save", async function(next){
if(!this.isModified("password")){
    next();
}
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    };

const User = mongoose.model("User", userSchema);
module.exports = User;