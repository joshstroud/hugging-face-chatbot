const express = require('express');

const connectDB = require('./config/db');
const chats = require('./routes/api/chats')

const app = express();

connectDB();

app.get('/', (req, res) => res.send('Main page of app'));

app.use('/chats', chats)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

