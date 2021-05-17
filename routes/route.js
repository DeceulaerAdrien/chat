(() => {
    document.querySelector("#send").addEventListener(click, () => {
        sendMessage({
            name: document.querySelector("#name").nodeValue,
            message: document.querySelector("#message").nodeValue
        });
    })

    getMessages()
})

let XHR = new XMLHttpRequest;


addMessages = (message) => {
    document.querySelector('#messages').append(`
    <h4> ${message.name} </h4>
    <p>  ${message.message} </p>`)
};

getMessages = () => {
    XHR.open('GET', 'https://localhost/messages', true)
    XHR.onload = () => {
        if (this.status === 200) {
            console.log('API GET OK');
            data = JSON.parse(this.response);
            data.forEach(elements => { addMessages() });
        } else if (this.status === 404) {
            console.log('error 404');
        };
    };
    XHR.send();
};
sendMessage = (message) => {
    let XHR = new XMLHttpRequest;
    XHR.open('POST', 'https://localhost/messages', true);
    XHR.onload = () => {
        if (this.status === 200) {
        };
        XHR.send();
        /*  $.post('https://localhost/messages', message) */
    };
};

const socket = io();

socket.on('message', addMessages)