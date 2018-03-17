/**
 * Created by ankit on 24/2/18.
 */
mnDefineX("ChatGroup", ["Util"] , function chatGroup(Util) {

    var chatGroups = {}; //groupId - {usrLists}
    var uniqueId = 1;

    function ChatGroup(userLists) {
        this.id = uniqueId++;
        this.userLists = userLists;
    }

    function createChatGroup(userLists) {
        var chatGroup = new ChatGroup(userLists);
        chatGroups[chatGroup.id] = chatGroup;
        return chatGroup.id;
    }

    function getChatGroup(id) {
        return chatGroups[id];
    }
    
    function updateChatGroup(groupId, userIds, userGroupStatus, from) {
        Util.each(userIds, function updateGroupStatus(userId, index) {
            if (userGroupStatus[index] == "1") {
                chatGroups[groupId].userLists.push(userId);
            } else {
                chatGroups[groupId].userLists.remove(userId);
            }
        });
        
    }
    
    return {
        createChatGroup : createChatGroup,
        getChatGroup : getChatGroup,
        updateChatGroup : updateChatGroup
    }
});