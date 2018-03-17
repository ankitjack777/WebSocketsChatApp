package com.chatApp.entities;

import javax.websocket.Session;
import java.util.UUID;

/**
 * Created by ankit on 19/2/18.
 */
public class User {
    private Session userSession;
    private String userName;
    private String sessionId;
    private String userId;

    User() {
        this.userId = UUID.randomUUID().toString();
    }

    public String getUserId() {
        return userId;
    }

    public Session getUserSession() {
        return userSession;
    }

    public void setUserSession(Session userSession) {
        this.userSession = userSession;
        setSessionId(userSession.getId());
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSessionId() {
        return sessionId;
    }

    private void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public static User createUser(Session session, String username) {
        User user = new User();
        user.setUserSession(session);
        user.setUserName(username);
        return user;
    }
}
