/**
 * Created by ankit on 24/2/18.
 */
mnDefineX("OutgoingChatHandler", ["ClientSocketSender", "MsgUtil"] , function outgoingChatHandler(ClientSocketSender, MsgUtil) {

    function sendPairChat(to, chatId, data) {//to -- userId
        var msg  = MsgUtil.createPairChatMessage(to, chatId, data);
        ClientSocketSender.sendMessage(msg);
    }

    function sendGroupChat(to, chatId, data, userIds) {//to - groupId
        var msg  = MsgUtil.createGroupChatMessage(to, chatId, data, userIds);
        ClientSocketSender.sendMessage(msg);
    }

    function sendGroupChatMembersChange(chatId, userIds, usersGroupStatus) {
        var msg  = MsgUtil.createGroupChatMembersChangeMessage(chatId, userIds, usersGroupStatus);
        ClientSocketSender.sendMessage(msg);
    }

    return {
        sendPairChat : sendPairChat,
        sendGroupChat: sendGroupChat,
        sendGroupChatMembersChange: sendGroupChatMembersChange
    }
});