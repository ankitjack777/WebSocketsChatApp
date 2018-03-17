package com.chatApp.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ankit on 17/3/18.
 */
public class ChatGroupUsersUpdate {
    List<User> newUsers;
    List<User> oldUsers;
    List<User> removedUsers;

    ChatGroupUsersUpdate() {
        newUsers = new ArrayList<User>();
        oldUsers = new ArrayList<User>();
        removedUsers = new ArrayList<User>();
    }

    public List<User> getNewUsers() {
        return newUsers;
    }

    public void setNewUsers(List<User> newUsers) {
        this.newUsers = newUsers;
    }

    public List<User> getOldUsers() {
        return oldUsers;
    }

    public void setOldUsers(List<User> oldUsers) {
        this.oldUsers = oldUsers;
    }

    public List<User> getRemovedUsers() {
        return removedUsers;
    }

    public void setRemovedUsers(List<User> removedUsers) {
        this.removedUsers = removedUsers;
    }
}
