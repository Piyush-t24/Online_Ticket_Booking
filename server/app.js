const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connecttoDB = require('./db/db');
const venueRoutes = require('./routes/venueRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes')
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes')
const setEnvVariables = require('./utils/awsSecrets');  
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); 
  },
  credentials: true, // Allow cookies and credentials
}));
require('events').EventEmitter.defaultMaxListeners = 100; // Set it to 100




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
connecttoDB();
if(process.env.ENV == 'production'){
    setEnvVariables();
}
// const buildpath = path.join(_dirname, "../client/dist");
// app.use(express.static(buildpath));
// ------------------------------------------
// TOO BE REMOVED LATER
const authMiddleware = require('./middleware/authMiddleware')
app.get('/',(req,res)=>{
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    if(token){
        res.redirect('/add-venue')
    }
    res.render('admin');
});
app.get('/add-venue',authMiddleware.authAdmin, (req,res)=>{
    res.render('index');
});
const Venue = require('./db/models/venueModel');

app.get('/list-venues', authMiddleware.authAdmin, async (req, res) => {
    try {
        // Fetch all venues from the database
        const venues = await Venue.find();

        // Render the EJS template and pass the venues data
        res.render('list', { venues });
    } catch (err) {
        console.error('Error fetching venues:', err);

        // Handle errors gracefully
        res.status(500).json({ message: 'Server error while fetching venues' });
    }
});

// -----------------------------------------
// eventNames.apply(assert function authRoutes controller)


app.use('/venue', venueRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/author', authorRoutes);
app.use('/auth',authRoutes)
app.use('/order',orderRoutes);
module.exports = app;