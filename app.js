const express = require('express');

const connectDB = require('./config/db');

const cors = require('cors');
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});
const passport = require('passport');

const chats = require('./routes/api/chats')
// const users = require('./routes/api/users')

// const UserModel = require('./models/User');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

connectDB();

// cors breaks the api call to hugging face, for some reason
// app.use(cors());

// passport.use(UserModel.createStrategy());

// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

app.get('/', (req, res) => res.send('Main page of app'));

app.use('/api/chats', chats)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
 
