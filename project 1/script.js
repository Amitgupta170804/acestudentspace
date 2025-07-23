document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', function () {
        const messageText = messageInput.value;
        if (messageText.trim() !== '') {
            const messageElement = document.createElement('div');
            messageElement.textContent = messageText;
            messageElement.classList.add('chat-message'); // Apply the chat-message class
            chatMessages.appendChild(messageElement);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    messageInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});