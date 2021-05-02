const conversationAPI = require('../conversationAPI');

const pastUserInputs = [];
const generatedResponses = [];
const promptText = "How are you?";

const APIInput = { pastUserInputs, generatedResponses, promptText}

conversationAPI.getConversationResponse(APIInput).then(res => console.log(res));