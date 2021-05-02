// pass a string as argument to get prompt;
const conversationAPI = require('../conversationAPI');

const pastUserInputs = [];
const generatedResponses = [];
const promptText = process.argv[2] || "Can you tell me the time?";

const APIInput = { pastUserInputs, generatedResponses, promptText }

conversationAPI.getConversationResponse(APIInput).then(res => console.log(res));