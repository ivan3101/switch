const express = require('express');
const app = express();
const path = require('path');
const mqttController = require('./mqtt');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res
        .status(200)
        .sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/mqtt', mqttController);

app.listen(3000, () => console.log('Servidor iniciado en localhost:3000'));