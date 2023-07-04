const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;
  
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req?.headers?.authorization?.split(' ')[1];
        console.log("TOKEN", token);
        try {
            if(token){
                const decodedUser = jwt.verify(token, process.env.JWT_KEY);
                const user = await User.findById(decodedUser?.id);
                console.log("USER", user);
                //attach the user to the req obj
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error("Not authorized token expired");
        }
    } else if (error) {
      throw new Error("There is no token available");
    }
});

module.exports = authMiddleware;