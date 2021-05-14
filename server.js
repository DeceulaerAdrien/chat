require('dotenv').config();

const express = require('express'),
    app = express(),
    PORT = 5000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    MONGO_USER = process.env.MONGO_USER,
    MONGO_PW = process.env.MONGO_PW,
    MONGO_DB = process.env.MONGO_DB,
    URI = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_DB}.hu5em.mongodb.net/Becode?retryWrites=true&w=majority`,
    Message = mongoose.model('Message', { name: String, message: String });




app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(5000, () => {
    console.log(`server running on port ${PORT}`)
});

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('DB connected')
});

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
        res.sendStatus(200);
    })
});