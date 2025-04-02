const {oauth2client} = require('../utils/googleConfig')
const userModel = require('../db/models/userModel')
const axios = require('axios')
const userService = require('../services/userService')


module.exports.googleLogin= async(req,res)=>{
    const { code }=req.body;
    console.log(req.body);
    try {
        console.log("c1")
        const googleRes = await oauth2client.getToken(code);
        console.log(googleRes)
         oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        console.log(userRes)
        const { email, name, picture } = userRes.data;
     
        // console.log(userRes);
        let user = await userModel.findOne({ email });

        if (!user) {
            console.log(email+name);
            const obj = {
                name:{
                    firstname: name.split(' ')[0],
                    lastname: name.split(' ')[1] || ' '
                },
                email:email,
                photo: picture,
                emailVerified: true,
                password: null
            }
            try{
                const userData = await userService.registerUser(obj);
                const {user, token} = userData;
                console.log(token);
                res.cookie('token', token,{
                    httpOnly: true,  // Prevents JavaScript from accessing it
                    secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
                   sameSite: process.env.NODE_ENV === 'production' ?'None': 'lax',
                   partitioned: process.env.NODE_ENV === 'production'  // Adjust for cross-site requests
               }).status(201).json({token, user});
            }catch(e){
                throw Error("Unable to create new user")
            }
        }
        console.log(user);
        const token = await user.generateAuthToken();
        console.log(token)
        res.cookie('token', token,{
            httpOnly: true,  // Prevents JavaScript from accessing it
            secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
           sameSite: process.env.NODE_ENV === 'production' ?'None': 'lax',
           partitioned: true  // Adjust for cross-site requests
       }).status(201).json({token, user});
    

    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Failed to login"+error.message})
    }
}