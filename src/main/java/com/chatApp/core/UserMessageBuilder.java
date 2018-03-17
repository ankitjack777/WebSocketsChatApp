package com.chatApp.core;

import com.chatApp.entities.User;
import com.chatApp.entities.UserMessage;
import com.chatApp.utils.MessageType;

import java.util.List;

/**
 * Created by ankit on 23/2/18.
 */
public class UserMessageBuilder {
    public static UserMessage createAllUsersListMessage(User user, List userIds, List userNames, List usersOnlineStatus) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(user.getUserId());//not needed
        userMessage.setType(MessageType.USERS_DETAILS.getValue());
        userMessage.setUserIds(userIds);
        userMessage.setUserNames(userNames);
        userMessage.setUsersOnlineStatus(usersOnlineStatus);
        return userMessage;
    }

    public static UserMessage createOpenConnAckMessage(User user) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(user.getUserId());
        userMessage.setData(user.getUserId());
        userMessage.setType(MessageType.NEW_CONNECTION_ACK.getValue());
        return userMessage;
    }

    public static UserMessage createNewPairChatAckMessage(String senderId, String groupId, String chatId) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(senderId);
        userMessage.setTo(groupId);//needed
        userMessage.setChatId(chatId);
        userMessage.setType(MessageType.NEW_PAIR_CHAT_ACK.getValue());
        return userMessage;
    }

    public static UserMessage createNewGroupChatAckMessage(String senderId, String groupId, String chatId) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(senderId);
        userMessage.setTo(groupId);//needed
        userMessage.setChatId(chatId);
        userMessage.setType(MessageType.NEW_GROUP_CHAT_ACK.getValue());
        return userMessage;
    }

    public static UserMessage createPairChatMessage(String chatId, String senderId, String partnerId, String chatData) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(senderId);
        userMessage.setTo(partnerId);
        userMessage.setChatId(chatId);
        userMessage.setData(chatData);
        userMessage.setType(MessageType.PAIR_CHAT.getValue());
        return userMessage;
    }

    public static UserMessage createGroupChatMessage(String chatId, String senderId, String chatData) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(senderId);
        userMessage.setChatId(chatId);
        userMessage.setData(chatData);
        userMessage.setType(MessageType.GROUP_CHAT.getValue());
        return userMessage;
    }

    public static UserMessage createGroupChatMessage(String chatId, String senderId, String chatData, List<String> userIds, List<String> usersOnlineStatus) {
        UserMessage userMessage = createGroupChatMessage(chatId, senderId, chatData);
        userMessage.setUsersOnlineStatus(usersOnlineStatus);
        userMessage.setUserIds(userIds);
        return userMessage;
    }

    public static UserMessage createGroupChatMembersChangeMessage(String chatId, String senderId, List<String> userIds, List<String> usersGroupStatus) {
        UserMessage userMessage = new UserMessage();
        userMessage.setFrom(senderId);
        userMessage.setChatId(chatId);
        userMessage.setUserIds(userIds);
        userMessage.setUsersGroupStatus(usersGroupStatus);
        userMessage.setType(MessageType.GROUP_CHAT_MEMBERS_CHANGE.getValue());
        return userMessage;
    }

}
