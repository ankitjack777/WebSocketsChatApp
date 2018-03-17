package com.chatApp.utils;

/**
 * Created by ankit on 9/3/18.
 */
public enum ChatType {
    PAIR_CHAT("pair"),
    GROUP_CHAT("group"),
    OPEN("open");

    String value;

    ChatType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
