/**
 * Created by ankit on 24/2/18.
 */

mnDefineX("MessageModel", [] , function messageModel() {

    function buildUserMessage(data) {
        data = data || {};
        var userMessage = {};
        userMessage[Properties.TYPE] = data[Properties.TYPE];
        userMessage[Properties.CHAT_ID] = data[Properties.CHAT_ID];
        userMessage[Properties.DATA] = data[Properties.DATA];
        userMessage[Properties.TO] = data[Properties.TO];
        userMessage[Properties.FROM] = data[Properties.FROM];
        userMessage[Properties.USER_IDS] = data[Properties.USER_IDS];
        userMessage[Properties.USER_NAMES] = data[Properties.USER_NAMES];
        userMessage[Properties.USERS_ONLINE_STATUS] = data[Properties.USERS_ONLINE_STATUS];
        userMessage[Properties.USERS_GROUP_STATUS] = data[Properties.USERS_GROUP_STATUS];
        return userMessage;
    }

    var Properties = {
          "TYPE" : "type",
          "CHAT_ID" : "chatId",
          "DATA" : "data",
          "FROM" : "from",
          "TO" : "to",
          "USER_IDS" : "userIds",
          "USER_NAMES" : "userNames",
          "USERS_ONLINE_STATUS" : "usersOnlineStatus",
          "USERS_GROUP_STATUS" : "usersGroupStatus"
    };

    var MESSAGE_TYPES = {
        "NEW_CONNECTION_ACK" : "newConnAck",
        "USERS_DETAILS" : "usersDetails",
        "PAIR_CHAT" : "pairChat",
        "GROUP_CHAT" : "groupChat",
        "NEW_PAIR_CHAT_ACK" : "newPairChatAck",
        "NEW_GROUP_CHAT_ACK" : "newGroupChatAck",
        "GROUP_CHAT_MEMBERS_CHANGE" : "groupChatMembersChange"
    };

    return {
        buildUserMessage : buildUserMessage,
        Properties : Properties,
        MESSAGE_TYPES : MESSAGE_TYPES
    }
});