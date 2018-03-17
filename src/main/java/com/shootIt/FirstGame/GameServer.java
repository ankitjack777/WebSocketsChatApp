package com.shootIt.FirstGame;


import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ankit on 18/2/18.
 */

@ServerEndpoint("/helloGame/{username}")
@ApplicationScoped//not needed actually
//@ServerEndpoint("/helloGame") //if u dont need username in path
public class GameServer {
    private static Map<String, String> users = new HashMap();

    @OnOpen
    public void myOnOpen (Session session, @PathParam("username") String username) throws IOException {
        System.out.println ("WebSocket opened: "+session.getId());
        users.put(session.getId(), username);
        session.getBasicRemote().sendText("hey "+ username + ", ur session id is " + session.getId());
        //getbasicremote() is sync
    }

    @OnMessage
    public void processMessage( String message, Session session)
            throws IOException {

        String userName =  users.get(session.getId());
        System.out.println("sent from " + userName + ":::"+ message);

//        message.setFrom(users.get(session.getId()));
//        broadcast(message);
    }

    @OnClose
    public void onClose(Session session) throws IOException {

        users.remove(session.getId());
        System.out.println("connection closed from client- sessionId--  " + session.getId());
//        Message message = new Message();
//        message.setFrom(users.get(session.getId()));
//        message.setContent("Disconnected!");
//        broadcast(message);
    }



    @OnError
    public void onError(Session session, Throwable throwable) {
     }
}
