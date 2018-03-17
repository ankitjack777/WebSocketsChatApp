package com.chatApp.entities;

import com.chatApp.utils.MessageType;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.google.gson.internal.Streams;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by ankit on 19/2/18.
 */
public class UserMessage {

    private String type;
    private String chatId;
    private String data;
    private String from;
    private String to;
    private List<String> userIds;
    private List<String> userNames;
    private List<String> usersOnlineStatus;
    private List<String> usersGroupStatus;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public List<String> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<String> userIds) {
        this.userIds = userIds;
    }

    public List<String> getUserNames() {
        return userNames;
    }

    public void setUserNames(List<String> userNames) {
        this.userNames = userNames;
    }

    public List<String> getUsersOnlineStatus() {
        return usersOnlineStatus;
    }

    public void setUsersOnlineStatus(List<String> usersOnlineStatus) {
        this.usersOnlineStatus = usersOnlineStatus;
    }

    public List<String> getUsersGroupStatus() {
        return usersGroupStatus;
    }

    public void setUsersGroupStatus(List<String> usersGroupStatus) {
        this.usersGroupStatus = usersGroupStatus;
    }
}
