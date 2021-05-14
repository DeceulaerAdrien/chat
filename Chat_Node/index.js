const app = require ('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) =>{
    res.sendFile(`${__dirname}/public/index.html`)
})

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté !');

    socket.on('disconnect', () => {
        console.log('User disconnected !');
    })


    socket.on('chat message', (msg) => {
        // console.log('Message:' + msg);
        io.emit('chat message', msg)
    });
});


server.listen(8080, () => {
    console.log('LISTEN on 8080....');
})