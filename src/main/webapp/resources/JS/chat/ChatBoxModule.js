/**
 * Created by ankit on 25/2/18.
 */
mnDefineX("ChatBoxModule", ["OutgoingChatHandler", "ChatStore", "ChatBoxDOM", "ChatGroup", "EventLib"] , function chatBoxModule(OutgoingChatHandler, ChatStore, ChatBoxDOM, ChatGroup, EventLib) {

    var uniqueId = 1;

    function setCommonProperties(chatId) {
        this.id = uniqueId++;
        this.chatId = chatId;
    }


    function PairChatBox(pairChatPartnerId, chatId) {
        setCommonProperties(chatId);
        this.pairChatPartnerId = pairChatPartnerId;
        this.chats =  ChatStore.getPairChat(pairChatPartnerId);
    }

    PairChatBox.prototype.Properties = {
        "PARTNER_ID" : "pairChatPartnerId",
        "CHAT_ID" : "chatId",
        "ID" : "id",
        "CHATS" : "chats"
    };

    PairChatBox.prototype.updatePairChat = function updatePairChat(data) {
        ChatStore.storePairChat(this.id, data);
        ChatBoxDOM.updatePairChat(this);
    };

    PairChatBox.prototype.usersChangeListener = function (userIds) {//Done button listener
        EventLib.triggerEvent(this.id, "USERS_CHANGE_FOR_PAIR_CHAT", userIds);
    };

    PairChatBox.prototype.newMessageListener = function (data) {
        OutgoingChatHandler.sendPairChat(this.pairChatPartnerId, this.chatId, data);
    };

    function createPairChatBox(pairChatPartnerId, chatId) {
        var pairChatBox = new PairChatBox(pairChatPartnerId, chatId);
        return pairChatBox;
    }




    function GroupChatBox(groupId, chatId) {
        setCommonProperties(chatId);
        this.groupId = groupId;
        this.chats =  ChatStore.getGroupChat(groupId);
    }

    PairChatBox.prototype.Properties = {
        "GROUP_ID" : "groupId",
        "CHAT_ID" : "chatId",
        "ID" : "id",
        "CHATS" : "chats"
    };

    GroupChatBox.prototype.updateGroupChat = function updateGroupChat(data, from) {
        ChatStore.storeGroupChat(this.id, data);
        ChatBoxDOM.updateGroupChat(this);
    };

    GroupChatBox.prototype.usersChangeListener = function (userIds, usersGroupStatus) {
        ChatGroup.updateChatGroup(this.groupId, userIds, usersGroupStatus);
        if (this.chatId) {
            OutgoingChatHandler.sendGroupChatMembersChange(this.chatId, userIds, usersGroupStatus);
        }
    };

    GroupChatBox.prototype.newMessageListener = function (data) {
        var userIds = ChatGroup.getChatGroup(this.groupId)["userLists"];
        OutgoingChatHandler.sendGroupChat(this.groupId, this.chatId, data, userIds);
    };

    function createGroupChatBox(groupId, chatId) {
        var groupChatBox = new GroupChatBox(groupId, chatId);
        groupChatBox.attachListener();
        return groupChatBox;
    }
    
    return {
        createPairChatBox : createPairChatBox,
        createGroupChatBox : createGroupChatBox,
        PairChatBox : PairChatBox,
        GroupChatBox : GroupChatBox
    }
});