const axios = require('axios');
const { response } = require('express');

const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";
const postHeaders = { "Authorization": "Bearer api_elyYFHzeepHfdyJZftFwngSokNXaPWNrgT" };

// query returns a promise
function query(payload, callback) {
    data = JSON.stringify(payload);
    return axios.post(API_URL, data, { headers: postHeaders });
}

// Example query use from Conversational Task @ https://api-inference.huggingface.co/docs/python/html/detailed_parameters.html#detailed-parameters
// query({
//     "inputs": {
//         "past_user_inputs": [],
//         "generated_responses": [],
//         "text": "Hey, I'm having some mental health problems. Do you have a second to talk?"
//     },
// });

function getConversationResponse( { pastUserInputs, generatedResponses, promptText } ) {
    return query({
        "inputs": {
            "past_user_inputs": pastUserInputs,
            "generated_responses": generatedResponses,
            "text": promptText
        },
    })
    .then(res => {
        // console.log(res.data.generated_text);
        return res.data.generated_text;
    });
}

module.exports.getConversationResponse = getConversationResponse;