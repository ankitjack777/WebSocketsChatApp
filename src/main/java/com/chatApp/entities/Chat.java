package com.chatApp.entities;

import com.chatApp.utils.ChatType;

import java.util.List;
import java.util.UUID;

/**
 * Created by ankit on 19/2/18.
 */
public class Chat {
    private String chatId;
    private ChatType chatType;
    private List<User> pairChatPartners;
    private ChatGroup chatGroup;

    public Chat(ChatType chatType) {
        this.chatId = UUID.randomUUID().toString();
    }

    public ChatType getChatType() {
        return chatType;
    }

    public void setChatType(ChatType chatType) {
        this.chatType = chatType;
    }

    public List getPairChatPartners() {
        return pairChatPartners;
    }

    public void setPairChatPartners(List pairChatPartners) {
        this.pairChatPartners = pairChatPartners;
    }

    public ChatGroup getChatGroup() {
        return chatGroup;
    }

    public void setChatGroup(ChatGroup chatGroup) {
        this.chatGroup = chatGroup;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public User getPairChatPartner(User oneUser) {
        return pairChatPartners.get(0) == oneUser ? pairChatPartners.get(1) : pairChatPartners.get(0);
    }

    public List<User> getGroupChatPartners() {
        return chatGroup.getUserLists();
    }

}
