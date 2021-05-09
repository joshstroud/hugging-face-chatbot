const axios = require('axios');

const API_URL = "https://api-inference.huggingface.co/models/gpt2";
const postHeaders = { "Authorization": "Bearer api_elyYFHzeepHfdyJZftFwngSokNXaPWNrgT" };

function query(payload, callback) {
    data = JSON.stringify(payload);
    response = axios.post(API_URL, data, { headers: postHeaders });
    return response.then(res => {
        callback(res.data)
    });
}

query({ "inputs": process.argv[2], "max_new_tokens": "200" }, 
console.log);