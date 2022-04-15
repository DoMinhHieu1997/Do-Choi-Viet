const responseMessage = (messageText,messageCode, data) => {
    const message = {
        messageText: messageText,
        messageCode: messageCode,
        data: data
    }
    return message;
}

module.exports = responseMessage;