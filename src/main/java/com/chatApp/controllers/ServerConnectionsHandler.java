package com.chatApp.controllers;

import com.chatApp.core.UserMessageHandler;
import com.chatApp.entities.ActiveUsers;
import com.chatApp.entities.User;
import com.chatApp.entities.UserMessage;
import com.chatApp.utils.MessageDecoder;
import com.chatApp.utils.MessageEncoder;
import com.chatApp.utils.Util;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by ankit on 19/2/18.
 */
@ServerEndpoint(value = "/helloChatServer/{username}",
        decoders = MessageDecoder.class,
        encoders = MessageEncoder.class )
public class ServerConnectionsHandler {
    @OnOpen
    public void myOnOpen (Session session, @PathParam("username") String username) throws IOException, EncodeException {
        System.out.println ("WebSocket opened for new user: " + session.getId());
        User sender = User.createUser(session, username);
        ActiveUsers.addUser(sender);
//        session.getBasicRemote().sendText("hey "+ username + ", ur session id is " + session.getId()); //getbasicremote() is sync - can be done async
        UserMessageHandler.sendOpenConnAck(sender);
        UserMessageHandler.broadcastActiveUserAdded(sender);
    }

    @OnMessage
    public void processMessage(UserMessage message, Session session)
            throws IOException, EncodeException {

        User sender = ActiveUsers.getUserBySessionId(session.getId());
        if (sender == null) {//will not listen to any request - if no user object created for that sessionId
            return;
        }
        UserMessageHandler.processMessage(sender, message);
        System.out.println("sent from " + sender.getUserName() + ":::"+ message);
    }


    @OnClose
    public void onClose(Session session) throws IOException {
        ActiveUsers.removeUser(session);
        System.out.println("connection closed from client- sessionId--  " + session.getId());
    }



    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("connection error--  " + session.getId());
    }
}
