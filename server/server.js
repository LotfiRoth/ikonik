const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const cors = require ('cors');

// IMPORT .ENV DATA
require('dotenv').config();

// ROUTES AUTOLOADING WITH FILES SYSTEM NODE.JS
const {readdirSync}= require('fs');

// APP
const app = express();

// DATABASE MONGO DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then(
    () => console.log(`CONNECTED TO DATABASE`)
)
.catch(
    err => console.log(`ERROR CONNECTING TO DATABASE:`, err)
    )

// MIDDLEWARES
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// ROUTES MIDDLEWARE
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));


// PORT
const port = process.env.PORT || 9000;

app.listen(port, () =>
    console.log(`SERVER IS RUNNING ON PORT ${port}`)
);