const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const creds = require('./credentials.json');

//this variable will hold the query result from a successful user login.
var user = null;


app.use(bodyParser.urlencoded({extended: true}));

//connecting to the database
mongoose.connect("mongodb+srv://" + creds.dbUsername + ":" + creds.dbPassword + "@mindmap.swavv.mongodb.net/UsersDB?retryWrites=true&w=majority");

//data schema
const usersSchema = {
    fName: String,
    lName: String,
    email: String,
    password: String
}

//schema instance to our database. All entries must follow the above schema.
const Users = mongoose.model("newUser", usersSchema);

//sends landing page to root path '/'
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//sends favicon image to '/favicon' path
app.get('/favicon', function(req, res) {
    res.sendFile(__dirname + '/favicon.png');
})

//sends css for landing page to '/css' path
app.get('/css', function(req, res) {
    res.sendFile(__dirname + '/welcome.css')
})

//sends background image to '/cloud' path
app.get('/cloud', function(req, res){
    res.sendFile(__dirname + '/cloud.png');
})

//sends login page to '/login' path
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
})

//sends css for login page to 'login/css' path
app.get('/login/css', function(req, res) {
    res.sendFile(__dirname + '/style.css');
})

//sends avatar image to 'avatar' path
app.get('/avatar', function(req, res) {
    res.sendFile(__dirname + '/avatar1.png');
})

//sends signup page to 'signup' path
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
})

//sends css for signup page to 'signup/css' path
app.get('/signup/css', function(req, res) {
    res.sendFile(__dirname + '/signup.css');
})

//sends homepage to '/home' path
app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})

//sends css for homepage to '/home/css' path
app.get('/home/css', function(req, res) {
    res.sendFile(__dirname + '/style1.css');
})

//handling the creation of a new user
app.post("/signup", function(req, res){
    //create new user object based on the user schema and the input boxes from the frontend.
    let newUser = new Users({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    });
    //saves user to the database
    newUser.save()
    .then((result) => {
        user = result;
        //redirects to the login page after the creation of the user
        res.redirect('/login');
    })
    //catches errors
    .catch((err) => {
        console.log(err);
    });
    
})

//handles login and receives correct user from the database
app.get('/get-user', function(req, res) {
    var email = req.query.email;
    var password = req.query.password;
    //finding the user by email
    Users.find({'email': email})
    .then(result => {
        //checking each corresponding item in the result query to see if the password matches the user entry.
        result.forEach(item => {
            if(item.password === password){
                console.log(result);
                user = result;
                //redirects to '/home' path when the password matches.
                res.redirect('/home');
            }
        })
        
    })
    //catches any errors and prints to the console.
    .catch(err => {
        console.log(err);
    })
})


//app is listening on port 5000
app.listen(5000, function(){
    console.log('server is running on port 5000');
});

