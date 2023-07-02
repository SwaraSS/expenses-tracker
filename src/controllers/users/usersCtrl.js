const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User");

const registerUser = expressAsyncHandler(async (req, res) =>{
    const {email, firstname, lastname, password} = req?.body;


    const userExist= await User.findOne({email});
    if(userExist) throw new Error('User already Exists');
    try {

        const user= await User.create({email, firstname, lastname, password});
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }
});

//Fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) =>{
    try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.json(error);
        }
});

module.exports = {registerUser, fetchUsersCtrl};