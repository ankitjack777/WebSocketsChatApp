package com.chatApp.core;

import com.chatApp.entities.*;
import com.chatApp.utils.MessageType;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by ankit on 22/2/18.
 */
public class UserMessageHandler {
    public static void processMessage(User sender, UserMessage userMessage) {
        System.out.println(sender.getUserName());
        System.out.println(userMessage.getData());
        System.out.println(userMessage.getChatId());

        String type = userMessage.getType();
        if (type.length() == 0)
            return;

        if (type == MessageType.PAIR_CHAT.getValue()) {
            handlePairChatMessage(sender, userMessage);
        } else if (type == MessageType.GROUP_CHAT.getValue()) {
            handleGroupChatMessage(sender, userMessage);
        } else if (type == MessageType.GROUP_CHAT_MEMBERS_CHANGE.getValue()) {
            handleGroupChatMembersChange(sender, userMessage);
        }
    }

    public static void broadCastMessage(User sender, UserMessage userMessage, List<User> receiversList) {
        for (User receiver: receiversList) {
            if (receiver == sender)
                continue;
            sendMessageToSingleUser(receiver, userMessage);
        }
    }

    public static void sendMessageToSingleUser(User receiver, UserMessage userMessage) {
        Session receiverSession = receiver.getUserSession();
        try{
            receiverSession.getBasicRemote().sendObject(userMessage);
        } catch (IOException e) {

        }catch (EncodeException e) {

        }
    }

    private static void updateChatGroupNewUsers(List<User> newUsers, Chat groupChat, User sender) {
        List<User> chatGroupUsers = groupChat.getGroupChatPartners();
        List<String> chatGroupUserIds = getAllUserIds(chatGroupUsers);
        broadCastMessage(sender,
                UserMessageBuilder.createGroupChatMessage(groupChat.getChatId(), sender.getUserId(), null,
                        chatGroupUserIds, ActiveUsers.getUsersOnlineStatus(chatGroupUserIds))
                , newUsers);
    }

    private static void updateChatGroupRemovedUsers(List<User> removedUsers, Chat groupChat, User sender) {
        for (int i=0; i<removedUsers.size(); i++) {
            User removedUser = removedUsers.get(i);
            String removedUserId = removedUser.getUserId();
            ArrayList<String> userIds = new ArrayList<String>(Arrays.asList(removedUserId));
            ArrayList<String> usersgroupStatus = new ArrayList<String>(Arrays.asList("0"));
            sendMessageToSingleUser(removedUser, UserMessageBuilder.createGroupChatMembersChangeMessage(groupChat.getChatId(), sender.getUserId(), userIds, usersgroupStatus));
        }
    }

    public static void handleGroupChatMembersChange(User sender, UserMessage userMessage) {
        String chatId = userMessage.getChatId();
        String senderId = sender.getUserId();
        List<String> groupChatUsersStatus = userMessage.getUsersGroupStatus();
        List<String> groupStatusChangedUserIds = userMessage.getUserIds();
        List<User> groupStatusChangedUsers = ActiveUsers.getUsersByUserId(groupStatusChangedUserIds);
        Chat groupChat = ChatsHandler.getGroupChatObject(chatId);
        ChatGroup chatGroup = groupChat.getChatGroup();

        ChatGroupUsersUpdate chatGroupUsersUpdate = chatGroup.updateChatGroupMembers(groupStatusChangedUsers, groupChatUsersStatus);
        updateChatGroupNewUsers(chatGroupUsersUpdate.getNewUsers(), groupChat, sender);
        updateChatGroupRemovedUsers(chatGroupUsersUpdate.getNewUsers(), groupChat, sender);

        List<User> oldUsers = chatGroupUsersUpdate.getOldUsers();
        broadCastMessage(sender, UserMessageBuilder.createGroupChatMembersChangeMessage(chatId, senderId, groupStatusChangedUserIds, groupChatUsersStatus), oldUsers);
    }

    public static void handlePairChatMessage(User sender, UserMessage userMessage) {
        String chatId = userMessage.getChatId();
        Boolean sendChatIdToSender = (chatId == null);
        String senderId = sender.getUserId();
        String partnerId = null;
        User partner = null;
        Chat chat = null;
        if (sendChatIdToSender == true) {
            partnerId = userMessage.getTo();
            partner = ActiveUsers.getUserByUserId(partnerId);
            chat = ChatsHandler.createPairChatObject(sender, partner);
            chatId = chat.getChatId();
            sendMessageToSingleUser(sender, UserMessageBuilder.createNewPairChatAckMessage(
                    senderId, partnerId, chatId));
        } else {
            chat = ChatsHandler.getPairChatObject(chatId);
            partner = chat.getPairChatPartner(sender);
            partnerId = partner.getUserId();
            //can validate -- partner.getid() == userMessage.getTo()
        }
         sendMessageToSingleUser(partner, UserMessageBuilder.createPairChatMessage(chatId, senderId, partnerId, userMessage.getData()));
    }

    private static List<String> getAllUserIds(List<User> users) {
        List<String> userIds = new ArrayList<String>();
        for (int i=0; i < users.size(); i++) {
            userIds.add(users.get(i).getUserId());
        }
        return userIds;
    }

    public static void handleGroupChatMessage(User sender, UserMessage userMessage) {
        String chatId = userMessage.getChatId();
        Boolean newChatStarted = (chatId == null);
        String senderId = sender.getUserId();
        ChatGroup chatGroup = null;
        Chat chat = null;
        List<User> chatGroupUsers = null;
        List<String> chatGroupUserIds = null;
        if (newChatStarted == true) {
            String clientGroupId = userMessage.getTo();
            chatGroupUserIds = userMessage.getUserIds();
            chatGroupUsers = ActiveUsers.getUsersByUserId(chatGroupUserIds);
            chatGroup = ChatGroupHandler.buildChatGroup(chatGroupUsers);
            chat = ChatsHandler.createGroupChatObject(chatGroup);
            chatId = chat.getChatId();
            sendMessageToSingleUser(sender, UserMessageBuilder.createNewGroupChatAckMessage(
                    senderId, clientGroupId, chatId));
        } else {
            chat = ChatsHandler.getGroupChatObject(chatId);
            chatGroupUsers = chat.getGroupChatPartners();
            chatGroupUserIds = getAllUserIds(chatGroupUsers);
        }
        if (newChatStarted == true) {
            broadCastMessage(sender,
                    UserMessageBuilder.createGroupChatMessage(chatId, senderId, userMessage.getData(),
                            chatGroupUserIds, ActiveUsers.getUsersOnlineStatus(chatGroupUserIds))
                    , chatGroupUsers);
        } else {
            broadCastMessage(sender, UserMessageBuilder.createGroupChatMessage(chatId, senderId, userMessage.getData()), chatGroupUsers);
        }
    }

    public static void sendAllUsersList(User receiver) {
        List activeUserIds = ActiveUsers.getActiveUsersIds();
        List activeUserNames = ActiveUsers.getActiveUsersNames();
        List usersOnlineStatus = ActiveUsers.getUsersOnlineStatus();
        sendMessageToSingleUser(receiver, UserMessageBuilder.createAllUsersListMessage(receiver, activeUserIds, activeUserNames, usersOnlineStatus));
    }

    public static void sendOpenConnAck(User user) {
        sendMessageToSingleUser(user, UserMessageBuilder.createOpenConnAckMessage(user));
        sendAllUsersList(user);
    }

    public static void broadcastActiveUserAdded(User changedUser) {
        List<User> receiversList = ActiveUsers.getAllActiveUsersList();
        List userIds = null,
                userNames = null,
                usersStatus = null;
        userIds = new ArrayList(Arrays.asList(changedUser.getUserId()));
        userNames = new ArrayList(Arrays.asList(changedUser.getUserName()));
        usersStatus = new ArrayList(Arrays.asList("1"));
        broadCastMessage(changedUser, UserMessageBuilder.createAllUsersListMessage(changedUser, userIds, userNames, usersStatus),receiversList);
    }

}
