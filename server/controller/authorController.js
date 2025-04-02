const { validationResult, ExpressValidator } = require('express-validator');
const authorService = require('../services/authorService');
const slotting = require('../services/slotting');
const blackList = require('../db/models/blacklistToken');
const { json } = require('body-parser');

module.exports.loginAuthor = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const author= {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const result = await authorService.loginAuthor(author);
        console.log(result)
        res.cookie('token', result.token,{
                 httpOnly: true,  // Prevents JavaScript from accessing it
                 secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
                    sameSite: process.env.NODE_ENV === 'production' ?'None': 'lax',
                partioned: process.env.NODE_ENV === 'production'  // Adjust for cross-site requests
            }
            
        );
        res.status(201).json({ message: "Successfully logged in", token: result.token });
    } catch (error) {
        res.status(400).json({error});
    }
    
    // ,{
    //     httpOnly: true,  // Prevents JavaScript from accessing it
    //     secure: false,   // Set to `true` if using HTTPS
    //     sameSite: 'lax'  // Adjust for cross-site requests
    // }
    
}
module.exports.addSlot = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);
    const slot = {
        venueId: req.user.venueId,
        date: req.body.date,
        slots: req.body.slots,
        maxCapacity: req.body.maxCapacity,
        elasticCapacity: req.body.elasticCapacity
    }
    try{
        const add = slotting.createSlot(slot)
        res.status(201).json("Slot Created")
    }catch(e){
        return res.status(400).json({message: e.message})
    }
    // res.json({slot})
    
}
module.exports.logoutAuthor = async (req,res)=>{
    res.clearCookie('token');
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    await blackList.create({token});
    res.status(200).redirect('/');
}

module.exports.getSlots = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const user= req.user;
    const venueId = user.venueId;
    try{
        const slotList = await slotting.getSlotsbyAuthor(venueId);
        res.status(201).json({slotList});
    }catch(e){
        res.status(400).json({message: e.message})
    }
    
}