const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const plants = require('./routes/plants');
const error = require('./controller/error');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: false }));

const MONGODB_URI = 'mongodb+srv://Edgar:12345@cluster0.yfixe.mongodb.net/Vivero?retryWrites=true&w=majority';

app.use(plants)

app.use(error.getError404);

mongoose.connect(MONGODB_URI)
    .then(res => app.listen(3000))
    .catch(err=> console.log(err));
