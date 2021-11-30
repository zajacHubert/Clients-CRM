const express=require('express');
const hbs=require('express-handlebars');
const {clientRouter} = require("./routers/client");
const methodOverride=require('method-override');
const {homeRouter} = require("./routers/home");
const {db}=require('./utils/db');
const {handleError} = require("./utils/errors");

const app=express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));
app.use(methodOverride('_method'));

app.engine('.hbs', hbs({
    extname:'.hbs',
    // helpers:handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/client', clientRouter);
app.use('/', homeRouter);

app.use(handleError);

app.listen(3000, 'localhost',()=>{
    console.log('server is listening at http://localhost:3000/');
});
