const express = require('express');
const router = express.Router();

const chatModels = require('../../models/Chat');
// const Chat = require('../../models/Chat');

router.post('/', (req, res) => {
    chatModels.chat.create(req.body)
        .then(chat => res.json({ msg: "Chat created succesfully" }))
        .catch(err => res.status(400).json({ error: 'Unable to create chat.'}));    
});

router.get('/', (req, res) => {
    chatModels.chat.find()
        .then(chats => res.json(chats))
        .catch(err => res.status(404).json({ nochatsfound: 'No chats found'}));
})

// router.post('/send', (req, res) => {
//     Message.create(req.body.message)
//         .then(message => {
//             Chat.create()
//         })
// })

module.exports = router;