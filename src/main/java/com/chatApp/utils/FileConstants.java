package com.chatApp.utils;

/**
 * Created by ankit on 19/2/18.
 */
public enum FileConstants {

    CHAT_PAGE("ChatPage.html"),
    LOGIN_PAGE("LoginPage.html");

    String value;

    FileConstants(String filename) {
        this.value = filename;
    }

    public String getValue() {
        return this.value;
    }

}
