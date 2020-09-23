const express = require('express');
const cors = require('cors');

const serverInstance = express();

// Use cors middleware
serverInstance.use(cors());

serverInstance.get('/helloworld', async function(req, res) {
    return res.status(200).json({ hello: 'world' });
});

module.exports = serverInstance;