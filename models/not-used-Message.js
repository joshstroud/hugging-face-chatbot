const mongoose = require('mongoose');
const schema = mongoose.Schema;

// schema from https://stackoverflow.com/questions/49293966/chat-document-structure-mongodb

const MessageSchema = new schema({
    chat_id: {
        type: mongoose.ObjectId,
        ref: "Chat",
        required: true
    },
    bot: {
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sent_date: {
        type: Date,
        default: Date.now
    }
})

module.exports.message = Message = mongoose.model('message', MessageSchema);