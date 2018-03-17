/**
 * Created by ankit on 24/2/18.
 */
mnDefineX("ChatStore", [] , function chatStore() {

    var pairChats = {},//userId to chatStorage
        groupChats = {}, //groupId to chatStorage
        maxCountOfChatToStore = 10;


    function addChat(chats, chat) {
        if (chats.length == maxCountOfChatToStore) {
            chats.shift(1);
        }
        chats.add(chat);
    }

    function storePairChat(pairChatPartnerId) {
        pairChats[pairChatPartnerId] = pairChats[pairChatPartnerId] || [];
        addChat(pairChats, chat);
    }

    function storeGroupChat() {
        groupChats[userId] = groupChats[userId] || [];
        addChat(groupChats, chat);

    }

    function getGroupChat(groupId) {
        return groupChats[groupId];
    }

    function getPairChat(pairChatPartnerId) {
        return pairChats[pairChatPartnerId];
    }

    function storeChat(msg) {

    }

    return {
        storeChat : storeChat,
        storePairChat : storePairChat,
        storeGroupChat : storeGroupChat,
        getGroupChat : getGroupChat,
        getPairChat : getPairChat
    }

});
