package com.chatApp.entities;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.websocket.Session;
import java.util.*;

/**
 * Created by ankit on 19/2/18.
 */
public class ActiveUsers {

    private static Map<String, User> usersMap = new HashMap();  //userId -  User
    private static Map<String, User> sessionIdToUserMap = new HashMap();  //sessionId - User
    private static Map<String, String> usersIdToNameMap = new HashMap();// userId - userName
    private static Map<String, String> usersIdToOnlineStatusMap = new HashMap();// userId - onlineStatus

    public static void addUser(User newUser) {
        usersMap.put(newUser.getUserId(), newUser);
        sessionIdToUserMap.put(newUser.getSessionId(), newUser);
        usersIdToNameMap.put(newUser.getUserId(), newUser.getUserName());
        usersIdToOnlineStatusMap.put(newUser.getUserId(), "1");
    }

    public static void mapNewSessionIdForUser(User user, Session session) {
        user.setUserSession(session);
    }

    public static void removeUser(Session session) {
        usersMap.remove(session.getId());
        //        Message message = new Message();
        //        message.setFrom(users.get(session.getId()));
        //        message.setContent("Disconnected!");
        //        broadcast(message);
    }

    public static User getUserBySessionId(String sesssionId) {
        return sessionIdToUserMap.get(sesssionId);
    }

    public static User getUserByUserId(String userId) {
        return usersMap.get(userId);
    }

    public static List getActiveUsersIds() {
        return new ArrayList<String>(usersIdToNameMap.keySet());
    }

    public static List getUsersOnlineStatus() {
        return new ArrayList<String>(usersIdToOnlineStatusMap.values());
    }

    public static List getActiveUsersNames() {
        return new ArrayList<String>(usersIdToNameMap.values());
    }

    public static List<User> filterActiveUsersList(String[] userIds) {
        if (userIds == null || userIds.length == 0) {
            return null;
        }
        List<User> activeUsers = new ArrayList<User>();
        User user;
        for (String userId : userIds) {
            if ((user = getUserByUserId(userId)) != null) {
                activeUsers.add(user);
            }
        }
        return activeUsers;
    }

    public static List<User> getAllActiveUsersList() {
        return new ArrayList<User>(usersMap.values());
    }

    public static List<User> getUsersByUserId(List<String> userIds) {
        List<User> users = new ArrayList<User>();
        for (int i=0; i < userIds.size(); i++) {
            String userId = userIds.get(i);
            users.add(getUserByUserId(userId));
        }
        return users;
    }

    public static List<String> getUsersOnlineStatus(List<String> userIds) {
        List<String> usersOnlineStatus = new ArrayList<String>();
        for (int i=0; i< userIds.size();i++) {
            usersOnlineStatus.add(usersIdToOnlineStatusMap.get(userIds.get(i)));
        }
        return usersOnlineStatus;
    }

}
