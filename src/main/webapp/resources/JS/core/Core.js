/**
 * Created by ankit on 20/2/18.
 */


mnRequireX(["ClientSocketListener", "Config", "ClientSocketSender", "NavBarHandler"], function  core(ClientSocketListener, Config, ClientSocketSender, NavBarHandler) {

    function makeNewConnection(username) {
        var url = "ws://localhost:8080/WebSocketsChatApp/helloChatServer/" + username;
        var clientSocket = new WebSocket(url);
        ClientSocketSender.init(clientSocket);
        ClientSocketListener.attachListeners(clientSocket);
    }

    function promptUsername() {
        var username = prompt("hey, How would i call u");
        Config.mnx[Config.Properties.USER_NAME] = username;
        NavBarHandler.setUserName(username);
        makeNewConnection(username);
    }
    
    function init() {
       promptUsername();
    }

    init();
});