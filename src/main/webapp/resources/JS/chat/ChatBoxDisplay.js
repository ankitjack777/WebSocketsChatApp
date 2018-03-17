/**
 * Created by ankit on 24/2/18.
 */
mnDefineX("ChatBoxDisplay", [] , function chatBoxDisplay() {

    var openedChatBoxes = [],//containsChatBoxIds
        maxChatBoxesShown = 3;

    function showGroupChatBox(groupChatBox) {
        var currentIndex = openedChatBoxes.indexOf(groupChatBox);
        if (currentIndex != -1) {
            openedChatBoxes.splice(currentIndex, 1);
        }
        openedChatBoxes.add(groupChatBox);
        displayChatBoxes();
    }

    function showPairChatBox(pairChatBox) {
        var currentIndex = openedChatBoxes.indexOf(pairChatBox);
        if (currentIndex != -1) {
            openedChatBoxes.splice(currentIndex, 1);
        }
        openedChatBoxes.add(pairChatBox);
        displayChatBoxes();
    }

    function displayChatBoxes() {
        var len = openedChatBoxes.length;
        for (var i= openedChatBoxes.length; i > 0 && i > len - maxChatBoxesShown; i++) {
            showChatBox(openedChatBoxes[i]);
        }
    }

    function showChatBox(chatBox) {

    }

    return {
        showPairChatBox : showPairChatBox,
        showGroupChatBox : showGroupChatBox
    }
});