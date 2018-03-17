/**
 * Created by ankit on 24/2/18.
 */
mnDefineX("ChatBoxesManager", ["ChatBoxModule", "EventLib", "ChatBoxDisplay", "ChatGroup", "ChatBoxDOM"] , function chatBoxesManager(ChatBoxModule, EventLib, ChatBoxDisplay, ChatGroup, ChatBoxDOM) {

    var pairChatBoxes = {},// userid - chatBoxRef
        groupChatBoxes = {};//groupid - chatBoxRef


    function createPairChatBox(pairChatPartnerId, chatId) {
        var pairChatBox = ChatBoxModule.createPairChatBox(pairChatPartnerId, chatId);
        addPairChatUsersChangeListener(pairChatBox);
        pairChatBoxes[pairChatPartnerId] = pairChatBox;
        return pairChatBox;
    }
    
    function createGroupChatBox(groupId, chatId) {
        var groupChatBox = ChatBoxModule.createGroupChatBox(groupId, chatId);
        groupChatBoxes[groupId] = groupChatBox;
        return groupChatBox;
    }

    function showIncomingPairChatMessage(senderId ,data) {
        var pairChatBox = getPairChatBox(senderId);

        pairChatBox.updatePairChat(data);
        ChatBoxDisplay.showPairChatBox(pairChatBox);
    }

    function showIncomingGroupChatMessage(groupId, data, senderId) {
        var groupChatBox = getGroupChatBox(groupId);

        groupChatBox.updateGroupChat(data, from);
        ChatBoxDisplay.showGroupChatBox(groupChatBox);
    }

    function getPairChatBox(pairChatPartnerId) {
        return pairChatBoxes[pairChatPartnerId];
    }

    function getGroupChatBox(groupId) {
        return groupChatBoxes[groupId];
    }

    function addPairChatUsersChangeListener(pairChatBox) {
        EventLib.addToEventQueue(pairChatBox.id, "USERS_CHANGE_FOR_PAIR_CHAT", function (userList) {
            userList.add(pairChatBox.getPartnerId());
            var groupId = ChatGroup.createChatGroup(userList);//always create a new chat group
            var groupChatBox = createGroupChatBox(groupId);
            ChatBoxDisplay.showGroupChatBox(groupChatBox);
        });
    }

    function userListClickListener(pairChatPartnerId) {
        var pairChatBox = getPairChatBox(pairChatPartnerId) || createPairChatBox(pairChatPartnerId);
        ChatBoxDisplay.showPairChatBox(pairChatBox);
    }

    function showGroupChatUsersChange(groupId, userIds, usernames, usersGroupStatus, from) {
        ChatBoxDOM.updateGroupChatMembersChange(this, userIds, usernames, usersGroupStatus, from);
    }

    function init() {
        EventLib.addToEventQueue("gbl", "USER_LIST_CLICK", userListClickListener);//always start pair chat first
    }

    init();



    return {
        showIncomingPairChatMessage : showIncomingPairChatMessage,
        showIncomingGroupChatMessage :showIncomingGroupChatMessage,
        createPairChatBox : createPairChatBox,
        createGroupChatBox : createGroupChatBox,
        showGroupChatUsersChange : showGroupChatUsersChange
    }
});