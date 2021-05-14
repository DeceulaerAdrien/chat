document.querySelector('#send').addEventListener('click', () => {
    sendMessage({
        name: document.querySelector('#name').nodeValue,
        message: document.querySelector('#message').nodeValue
    })
    getMessages();
});

const addMessages = (message) => {
    document.querySelector('#messages').append(`
    <h4> ${message.name} </h4>
    <p>  ${message.message} </p>`)
};

const getMessages = () => {
    get('http://localhost:5000/messages', (data) => {
        data.foreach(addMessages);
    })
};

const sendMessage = () => {
    post('http://localhost:5000/messages', message)
}