/**
 * Created by ankit on 9/3/18.
 */
mnDefineX("ClientSocketSender", [] , function clientSocketSender() {

    var csk;

    function sendMessage(msg) {
        csk.send(JSON.stringify(msg));//converting object to string -serialising
    }

    function init(clientSocket) {
        csk = clientSocket;
    }

    return {
        init : init,
        sendMessage : sendMessage
    }
});