const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User");
const generateToken = require("../../middlewares/generateToken");


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

//login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const {email, password} = req?.body;
    //Find user in Db
    const userFound = await User.findOne({email});
    //check if user password match
    if(userFound && (await userFound?.isPasswordMatch(password)))
    {
      res.json({
          _id: userFound?._id,
          firstname: userFound?.firstname,
          lastname: userFound?.lastname,
          email: userFound?.email,
          isAdmin: userFound?.isAdmin,
          token: generateToken(userFound?._id),       
      });  
    }
    else{
      res.status(401);
      throw new Error('Invalid Login Credentials');
    }

});

//User profile

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
   // const { _id } = req?.user;
  
    try {
      const myProfile = await User.findById(req?.user?._id).populate(["expenses", "income"]);
  
      res.json(myProfile);
    } catch (error) {
      res.json(error);
    }
  });

  //Update profile
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    //const { _id } = req?.user;
    //validateMongodbId(_id);
    const user = await User.findByIdAndUpdate(
      req?.user?._id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  });

module.exports = {registerUser, fetchUsersCtrl, loginUserCtrl, userProfileCtrl, updateUserCtrl};