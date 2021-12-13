const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


var user = null;


app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://MindMap-Server:test1234@mindmap.swavv.mongodb.net/UsersDB?retryWrites=true&w=majority");

//create data schema
const usersSchema = {
    fName: String,
    lName: String,
    email: String,
    password: String
}

const Users = mongoose.model("newUser", usersSchema);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/favicon', function(req, res) {
    res.sendFile(__dirname + '/favicon.png');
})

app.get('/css', function(req, res) {
    res.sendFile(__dirname + '/welcome.css')
})

app.get('/cloud', function(req, res){
    res.sendFile(__dirname + '/cloud.png');
})

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
})

app.get('/login/css', function(req, res) {
    res.sendFile(__dirname + '/style.css');
})

app.get('/avatar', function(req, res) {
    res.sendFile(__dirname + '/avatar1.png');
})

app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
})

app.get('/signup/css', function(req, res) {
    res.sendFile(__dirname + '/signup.css');
})

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/views/homepage.html');
})

app.get('/home/css', function(req, res) {
    res.sendFile(__dirname + '/style1.css');
})

app.post("/signup", function(req, res){
    let newUser = new Users({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
    .then((result) => {
        user = result;
        res.redirect('/login');
    })
    .catch((err) => {
        console.log(err);
    });
    
})

app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    Users.find({'email': email})
    .then(result => {
        if(result.password === password){
            user = result;
            res.redirect('/home');
        }
    })
    .catch(err => {
        console.log(err);
    })
})

app.listen(3000, function(){
    console.log('server is running on port 3000');
});

/**const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://MindMap-Server:test1234@mindmap.swavv.mongodb.net/UsersDB?retryWrites=true&w=majority';

mongoose.connect(dbURI);

app.listen(3005, function() {
    console.log('server is running on port 3005');
})

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/home', (req, res) => {
    res.render('homepage')
})

function getUser(){
    let desiredUser;
    User.find({}, function(users){
        users.forEach(user => {
            if(user.email === document.getElementById('email').innerHTML && user.password === document.getElementById('email').innerHTML){
                localStorage.setItem('user', user);
                console.log("localStorage has been saved to!")
            }
        })
    })
}

/**
//connect to MongoDB
const dbURI = 'mongodb+srv://MindMap-Server:test1234@mindmap.swavv.mongodb.net/UsersDB?retryWrites=true&w=majority';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000), function() {
        console.log("server listening on port 3000");
    })
    .catch((err) => console.log(err));

const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: true}));

//connecting to the database

//("mongodb+srv://412-Proj:Deng@cluster0.r2eqi.mongodb.net/UserDB", {useNewUrlParser: true}, {useUnifiedTopology: true});

//mongoose and mongo sandbox routes

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

app.post("/login", (req, res) => {
    let newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
        window.alert("User account has been created!");
    res.sendFile(__dirname + "/login.html");
})

app.get("/login", (req, res) => {
    User.find()
    .then((result))
})

app.get("/home", (req, res) => {
    res.sendFile("/homepage.html");
})


app.get('/all-users', (req, res) => {
    User.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/single-user', (req, res) => {
    User.find( {email: "dsimms362@gmai.com"} )
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    });
})
/**app.post("/", function(req, res) {
    let newUser = new User({
        email: 'email@email.com',
        password: 'test1234'
    });
    newUser.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})*/

/**app.listen(3000, function() {
    console.log("server is running on port 3000");
})*/