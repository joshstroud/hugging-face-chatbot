const express = require('express');
const router = express.Router();

const axios = require('axios');

const bodyParser = require('body-parser')

const conversationAPI = require('../../hugging-face-api/conversationAPI')

const chatModels = require('../../models/Chat');
// const Chat = require('../../models/Chat');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    console.log('Created chat');
    chatModels.chat.create(req.body)
        .then(chat => res.json(chat))
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


// bug here, doesn't return the full chat after bot response, need to fix
// Just do a get request after for now.
router.post('/:chatId', (req, res) => {
    const chatId = req.params.chatId;
    const message = Object.assign(req.body, { chat_id: chatId });

    let updatePromise = createMessage(message);

    updatePromise.then(chat => {
        return createBotMessageInChat(chatId);
    })
    .then(chat => {
        console.log(chat);
        res.json(chat)
    });
});
    
function createBotMessageInChat(chatId) {
    return chatModels.chat.findById(chatId).then(chat => {
        let APIInput = parseMessagesForConversationAPI(chat);
        return conversationAPI.getConversationResponse(APIInput);
    })
    .then(textResponse => {
        console.log('text response from bot:', textResponse)
        const message = {
            bot: true,
            message: textResponse,
            chat_id: chatId
        };
        return createMessage(message);
    });
}

function createMessage(message) {
    return chatModels.message.create(message)
    .then(message => {
        return chatModels.chat.updateOne({ _id: message.chat_id }, { $push: { messages: message } })
    }).then(update => {
        return chatModels.chat.findById(message.chat_id);
    }).then(chat => {
        //  console.log('Added message to chat: ', chat);
        return chat;
    })
    .catch(err => ({ err, error: 'Unable to create message' }));
}

function parseMessagesForConversationAPI(chat) {
    const pastUserInputs = chat.messages.
        filter(message => message.bot === false)
        .map(msg => msg.message);
    const generatedResponses = chat.messages
        .filter(message => message.bot === true)
        .map(msg => msg.message);
    const promptText = pastUserInputs.pop();

    const input = { pastUserInputs, generatedResponses, promptText };
    // console.log(input);
    return input;
} 

module.exports = router;