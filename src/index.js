const express = require('express')
const app = express()
const router = require('./routes/user')
const path = require('path');

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/', router)

app.use((req, res) => {
    res.render("error");
  });

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Working on port:${port} 
link:http://localhost:8080/`);
})



