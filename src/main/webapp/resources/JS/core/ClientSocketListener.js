/**
 * Created by ankit on 21/2/18.
 */

mnDefineX("ClientSocketListener", ["IncomingChatHandler"] , function clientSocketListener(IncomingChatHandler) {

    function onMessageCallback(evt) {
        console.log( evt.data);
        if (!evt.data) {
            return;
        }
        IncomingChatHandler.processIncomingMessage(evt);
    }

    function onConnectionOpenCallback(evt) {
        console.log( evt.data);
    }

    function onConnectionCloseCallback(evt) {
        console.log( "conn close" + evt.data);
    }

    function attachListeners(clientSocket) {
        clientSocket.onopen = onConnectionOpenCallback;
        clientSocket.onclose = onConnectionCloseCallback;
        clientSocket.onmessage = onMessageCallback;
    }

    return {
        attachListeners : attachListeners
    }
});