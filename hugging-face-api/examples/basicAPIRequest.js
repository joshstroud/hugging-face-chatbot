const axios = require('axios');

const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";
const postHeaders = { "Authorization": "Bearer api_elyYFHzeepHfdyJZftFwngSokNXaPWNrgT" };

function query(payload, callback) {
    data = JSON.stringify(payload);
    response = axios.post(API_URL, data, { headers: postHeaders });
    return response.then(res => {
        callback(res.data)
    });
}

query({
    "inputs": {
        "past_user_inputs": [],
        "generated_responses": [],
        "text": "Hey! Where are you located these days?"
    },
}, console.log);