/**
 * Created by ankit on 22/2/18.
 */

mnDefineX("MsgUtil", ["Config", "MessageModel"], function msgUtil(Config, MessageModel) {

    var clientUserId;
    
    function getClientId() {
        clientUserId = Config[Config.Properties.USER_ID];
        return clientUserId;
    }

    function setCommonProp(msg, to, chatId, data) {
        msg[MessageModel.Properties.FROM] = clientUserId || getClientId();
        msg[MessageModel.Properties.TO] = to;
        msg[MessageModel.Properties.CHAT_ID] = chatId;
        msg[MessageModel.Properties.DATA] = data;
    }
    function createPairChatMessage(to, chatId, data) {
        var msg = {};
        msg[MessageModel.Properties.TYPE] = MessageModel.MESSAGE_TYPES.PAIR_CHAT;
        setCommonProp(msg, to, chatId, data);
        return MessageModel.buildUserMessage(msg);
    }

    function createGroupChatMessage(to, chatId, data, userIds) {
        var msg = {};
        msg[MessageModel.Properties.TYPE] = MessageModel.MESSAGE_TYPES.GROUP_CHAT;
        setCommonProp(msg, to, chatId, data);
        if (!chatId)
            msg[MessageModel.Properties.USER_IDS] = userIds;
        return MessageModel.buildUserMessage(msg);
    }

    function createGroupChatMembersChangeMessage(chatId, userIds, usersGroupStatus) {
        var msg = {};
        msg[MessageModel.Properties.FROM] = clientUserId || getClientId();// if from == userids[] -- client left chat
        msg[MessageModel.Properties.TYPE] = MessageModel.MESSAGE_TYPES.GROUP_CHAT_MEMBERS_CHANGE;
        msg[MessageModel.Properties.CHAT_ID] = chatId;
        msg[MessageModel.Properties.USER_IDS] = userIds;
        msg[MessageModel.Properties.USERS_GROUP_STATUS] = usersGroupStatus;
        return MessageModel.buildUserMessage(msg);
    }

    return {
        createGroupChatMembersChangeMessage : createGroupChatMembersChangeMessage,
        createPairChatMessage : createPairChatMessage,
        createGroupChatMessage : createGroupChatMessage
    }
});