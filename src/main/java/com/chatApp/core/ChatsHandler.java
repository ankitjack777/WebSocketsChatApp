package com.chatApp.core;

import com.chatApp.entities.Chat;
import com.chatApp.entities.ChatGroup;
import com.chatApp.entities.User;
import com.chatApp.entities.UserMessage;
import com.chatApp.utils.ChatType;
import com.chatApp.utils.Util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ankit on 23/2/18.
 */
public class ChatsHandler {
    private static Map<String, Chat> pairChatMap = new HashMap<String, Chat>();
    private static Map<String, Chat> groupChatMap = new HashMap<String, Chat>();

    public static Chat getPairChatObject(String chatId) {
        return pairChatMap.get(chatId);
    }

    public static Chat getGroupChatObject(String chatId) {
        return groupChatMap.get(chatId);
    }

    public static Chat createPairChatObject(User sender, User partner) {
        Chat chat = new Chat(ChatType.PAIR_CHAT);
        ArrayList<User> pairChatPartners = new ArrayList<User>();
        pairChatPartners.add(sender);
        pairChatPartners.add(partner);
        chat.setPairChatPartners(pairChatPartners);
        pairChatMap.put(chat.getChatId(), chat);
        return chat;
    }

    public static Chat createGroupChatObject(ChatGroup chatGroup) {
        Chat groupChat = new Chat(ChatType.GROUP_CHAT);
        groupChat.setChatGroup(chatGroup);
        groupChatMap.put(groupChat.getChatId(), groupChat);
        return groupChat;
    }
}
