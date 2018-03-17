package com.chatApp.utils;

/**
 * Created by ankit on 22/2/18.
 */
public enum MessageType {
    USERS_DETAILS("usersDetails"),
    PAIR_CHAT("pairChat"),
    GROUP_CHAT("groupChat"),
    NEW_PAIR_CHAT_ACK("newPairChatAck"),
    NEW_GROUP_CHAT_ACK("newGroupChatAck"),
    NEW_CONNECTION_ACK("newConnAck"),
    GROUP_CHAT_MEMBERS_CHANGE("groupChatMembersChange");

    String value;

    MessageType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
