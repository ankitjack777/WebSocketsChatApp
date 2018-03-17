package com.chatApp.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by ankit on 19/2/18.
 */
public class ChatGroup {
    private List<User> userLists;
    private String chatGroupId;

    public ChatGroup() {
        this.chatGroupId = UUID.randomUUID().toString();
    }

    public List<User> getUserLists() {
        return userLists;
    }

    public void addUsers(List<User> users) {
        userLists.addAll(users);
    }

    public void removeUsers(List<User> users) {
        userLists.removeAll(users);
    }

    public void setUserLists(List<User> userLists) {
        this.userLists = userLists;
    }

    public String getChatGroupId() {
        return chatGroupId;
    }

    public ChatGroupUsersUpdate updateChatGroupMembers(List<User> groupStatusChangedUsers, List<String> groupChatUsersStatus) {
        ChatGroupUsersUpdate chatGroupUsersUpdate = new ChatGroupUsersUpdate();
        List<User> newUsers = chatGroupUsersUpdate.getNewUsers();
        List<User> oldUsers = chatGroupUsersUpdate.getOldUsers();
        List<User> removedUsers = chatGroupUsersUpdate.getRemovedUsers();

        for (int i = 0; i < groupStatusChangedUsers.size(); i++) {
            User changedUser = groupStatusChangedUsers.get(i);
            String userStatus = groupChatUsersStatus.get(i);
            if (userStatus.equals("1")) {
                if (userLists.contains(changedUser)) {
                    oldUsers.add(changedUser);
                } else {
                    newUsers.add(changedUser);
                    userLists.add(changedUser);
                }
            } else if (userStatus.equals("0")) {
                removedUsers.add(changedUser);
                userLists.remove(changedUser);
            }
        }
        return chatGroupUsersUpdate;
    }
}
