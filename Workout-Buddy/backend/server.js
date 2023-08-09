const express = require('express');
const dotenv = require('dotenv');
const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

dotenv.config();

const app = express()

app.use(express.json())

// middleware
app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
})

app.get('/', (req, res) => {
    res.json({ message : "Welcome to the App" })
})

app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port 4000');
        })
    })
    .catch((err) => {
        console.log(error)
    })

