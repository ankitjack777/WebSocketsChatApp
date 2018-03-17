/**
 * Created by ankit on 24/2/18.
 */

mnDefineX("IncomingChatHandler", ["ChatIdMapper", "MsgUtil", "OnlineUsersHandler", "MessageModel", "Config", "ChatBoxesManager", "ChatGroup"] ,
    function (ChatIdMapper, MsgUtil, OnlineUsersHandler, MessageModel, Config, ChatBoxesManager, ChatGroup) {

    function processIncomingMessage(evt) {
        var msg = MessageModel.buildUserMessage(JSON.parse(evt.data));

        switch(msg[MessageModel.Properties.TYPE]) {
            
            case MessageModel.MESSAGE_TYPES.NEW_CONNECTION_ACK :
                Config[Config.Properties.USER_ID] = msg[MessageModel.Properties.data];
                break;

            case MessageModel.MESSAGE_TYPES.USERS_DETAILS :
                OnlineUsersHandler.processOnlineUsersList(
                    msg[MessageModel.Properties.USER_IDS],
                    msg[MessageModel.Properties.USER_NAMES],
                    msg[MessageModel.Properties.USERS_ONLINE_STATUS]
                );
                break;

            case MessageModel.MESSAGE_TYPES.PAIR_CHAT: ;
                processIncomingPairChatMessage(msg);
                    break;

            case MessageModel.MESSAGE_TYPES.GROUP_CHAT:
                processIncomingGroupChatMessage(msg);
                break;

            case MessageModel.MESSAGE_TYPES.NEW_PAIR_CHAT_ACK:
                ChatIdMapper.mapPairChatId(msg[MessageModel.Properties.TO],
                    msg[MessageModel.Properties.CHAT_ID]);
                OnlineUsersHandler.updateUsersStatus([msg[MessageModel.Properties.TO]],
                    msg[MessageModel.Properties.USERS_ONLINE_STATUS]);
                break;

            case MessageModel.MESSAGE_TYPES.NEW_GROUP_CHAT_ACK:
                ChatIdMapper.mapGroupChatId(msg[MessageModel.Properties.TO],
                    msg[MessageModel.Properties.CHAT_ID]);
                OnlineUsersHandler.updateUsersStatus(msg[MessageModel.Properties.USER_IDS],
                    msg[MessageModel.Properties.USERS_ONLINE_STATUS]);
                break;

            case MessageModel.MESSAGE_TYPES.GROUP_CHAT_MEMBERS_CHANGE://can contain --onlineStatus
                processGroupMembersChange(msg);
                break;
        }
    }

    function processGroupMembersChange(msg) {
        var chatId = msg[MessageModel.Properties.CHAT_ID],
            from = msg[MessageModel.Properties.FROM],
            userIds = msg[MessageModel.Properties.USER_IDS],
            usersGroupStatus = msg[MessageModel.Properties.USERS_GROUP_STATUS],
            groupId = ChatGroup.getGroupId(chatId);

        ChatGroup.updateChatGroup(groupId, userIds, usersGroupStatus);
        var usernames;//get usernames - if added
        ChatBoxesManager.showGroupChatUsersChange(groupId, userIds, usernames, usersGroupStatus, from);
    }

    function processIncomingPairChatMessage(msg) {
        var chatId = msg[MessageModel.Properties.CHAT_ID],
            from = msg[MessageModel.Properties.FROM],
            data = msg[MessageModel.Properties.DATA];

        if (!ChatIdMapper.isPairChatIdMapped(chatId)) {
            ChatBoxesManager.createPairChatBox(from, chatId);
            ChatIdMapper.mapPairChatId(from, chatId);

            OnlineUsersHandler.updateUsersStatus([from], msg[MessageModel.Properties.USERS_ONLINE_STATUS]);
        }
        ChatBoxesManager.showIncomingPairChatMessage(from, data);
    }

    function processIncomingGroupChatMessage(msg) {
        var chatId = msg[MessageModel.Properties.CHAT_ID],
            from = msg[MessageModel.Properties.FROM],
            data = msg[MessageModel.Properties.DATA];

        var groupId;

        if (!ChatIdMapper.isGroupChatIdMapped(chatId)) {
            var  userIds = msg[MessageModel.Properties.USER_IDS],
                usersOnlineStatus = msg[MessageModel.Properties.USERS_ONLINE_STATUS];

                groupId = ChatGroup.createChatGroup(userIds);
            ChatIdMapper.mapGroupChatId(groupId, chatId);
            ChatBoxesManager.createGroupChatBox(groupId, chatId);
            OnlineUsersHandler.updateUsersStatus(userIds, usersOnlineStatus);

        } else {
            groupId = ChatGroup.getGroupId(chatId);
        }
        ChatBoxesManager.showIncomingGroupChatMessage(groupId, data, from);
    }



    return {
        processIncomingMessage : processIncomingMessage
    }
});