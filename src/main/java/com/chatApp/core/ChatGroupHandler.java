package com.chatApp.core;

import com.chatApp.entities.ChatGroup;
import com.chatApp.entities.User;

import java.util.*;

/**
 * Created by ankit on 23/2/18.
 */
public class ChatGroupHandler {
    private static Map<String, ChatGroup> chatGroupMap = new HashMap<String, ChatGroup>();

    public static ChatGroup buildChatGroup(List<User> users) {
        ChatGroup chatGroup = new ChatGroup();
        chatGroup.addUsers(users);
        return chatGroup;
    }

    public static ChatGroup getChatGroup(String serverChatGroupId) {
        return chatGroupMap.get(serverChatGroupId);
    }
}
