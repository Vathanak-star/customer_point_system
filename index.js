const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const cors = require('cors');

require('dotenv').config();
require('./config/passport');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.use('/api/auth',authRoutes);
app.use('/api',customerRoutes);

app.listen(process.env.PORT, async () => {
    console.log(`Server started at port: ${process.env.PORT}`)
})