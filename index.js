const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const  userRoute = require('./routes/user');
const app = express();
app.use("/user", userRoute);
const port = 8000;

mongoose.connect('mongodb://localhost/blogging_app');

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.get('/', (req, res) => {
  res.render('home');
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});