const app = require('express')();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

app.get('/',(req,res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

io.on('connection',(socket) =>{
    console.log('un utilisateur est connecté');
    socket.on('chat-message',(data) =>{
       io.emit('chat-message',data);
    });
})
server.listen(3000,() =>{
    console.log('Ecoute sur le port 3000');
});

