require('dotenv').config();

const express = require('express'),
    app = express(),
    PORT = process.env.PORT,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    URI = process.env.URI,
    Message = mongoose.model('Message', { name: String, message: String }),
    http = require('http').Server(app),
    io = require('socket.io')(http);


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    const message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
});

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('DB connected')
});

io.on('connection', () => {
    console.log('a user is connected')
})

const server = http.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});