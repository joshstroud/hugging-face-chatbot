const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')

const chatModels = require('../../models/Chat');
// const Chat = require('../../models/Chat');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    chatModels.chat.create(req.body)
        .then(chat => res.json({ msg: "Chat created succesfully" }))
        .catch(err => res.status(400).json({ error: 'Unable to create chat'}));    
});

router.get('/', (req, res) => {
    chatModels.chat.find()
        .then(chats => res.json(chats))
        .catch(err => res.status(404).json({ nochatsfound: 'No chats found'}));
})

router.get('/:chatId', (req, res) => {
    chatModels.chat.findById(req.params.chatId)
        .then(chat => res.json(chat))
        .catch(err => res.status(404).json( {nochatsfound: 'Chat with given id not found'}));
});

router.post('/:chatId', (req, res) => {
    const chatId = req.params.chatId;
    const body = Object.assign(req.body, { chat_id: chatId });
    chatModels.message.create(body)
        .then(message => {
            console.log('Message object:' ,message);
            chatModels.chat.updateOne( {_id: chatId}, { $push: { messages: message }} )
                .then(update => {
                    chatModels.chat.findById(chatId).then(chat => {
                        console.log('Added message to chat: ', chat);
                        res.json(chat);
                    })
                })
            })
        .catch(err => res.status(400).json( { err, error: 'Unable to create message' }));
});

// router.post('/send', (req, res) => {
//     Message.create(req.body.message)
//         .then(message => {
//             Chat.create()
//         })
// })

module.exports = router;