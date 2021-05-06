const express = require('express');

const connectDB = require('./config/db');
const chats = require('./routes/api/chats')
const cors = require('cors');

const app = express();

connectDB();


// cors breaks the api call to hugging face, for some reason
// app.use(cors());

app.get('/', (req, res) => res.send('Main page of app'));

app.use('/api/chats', chats)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
 
