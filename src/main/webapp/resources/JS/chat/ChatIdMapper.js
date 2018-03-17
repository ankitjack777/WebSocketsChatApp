/**
 * Created by ankit on 25/2/18.
 */
mnDefineX("ChatIdMapper", ["Util", "MessageModel", "Config"] , function chatIdMapper(Util, MessageModel, Config) {

    var pairChatIdMap = {},//chatId - userId||
        pairChatIdReverseMap = {};//userId| - chatId

    var groupChatIdMap = {},//chatId - ||groupId
        groupChatIdReverseMap = {};//|groupId - chatId

    function mapGroupChatId(chatId, groupId) {
        groupChatIdMap[chatId] = groupId;
        groupChatIdReverseMap[groupId] = chatId;
    }

    function mapPairChatId(chatId, userId) {
        pairChatIdMap[chatId] = userId;
        pairChatIdReverseMap[userId] = chatId;
    }


    function getChatId(userIdOrGroupId) {
        return pairChatIdReverseMap[userIdOrGroupId] || groupChatIdReverseMap[userIdOrGroupId];
    }

    function getUserId(chatId) {
        return pairChatIdMap[chatId];
    }

    function getGroupId(chatId) {
        return groupChatIdMap[chatId];
    }

    function isPairChatIdMapped(chatId) {
        return pairChatIdMap[chatId];
    }

    function isGroupChatIdMapped(chatId) {
        return groupChatIdMap[chatId];
    }

    function getPairChatAnotherPartner(partnerIds) {
        return partnerIds[0] == clientProfile.getUserId() ? partnerIds[1] : partnerIds[0];
    }

    function map(msg) {
        var chatType = msg[MessageModel.Properties.TYPE];
        if (chatType == MessageModel.MESSAGE_TYPES.PAIR_CHAT) {
            // var partnerIds = ;
            getPairChatAnotherPartner(partnerIds, msg[MessageModel.ADDED_USER_IDS]);
        }
    }

    return {
        getGroupId : getGroupId,
        getUserId : getUserId,
        getChatId : getChatId,
        mapGroupChatId : mapGroupChatId,
        mapPairChatId : mapPairChatId,
        isPairChatIdMapped : isPairChatIdMapped,
        isGroupChatIdMapped : isGroupChatIdMapped,
        map : map
    }
});