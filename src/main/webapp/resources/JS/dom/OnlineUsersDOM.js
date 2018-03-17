/**
 * Created by ankit on 24/2/18.
 */

mnDefineX ("OnlineUsersDOM", ["Util", "EventLib"], function onlineUsersDOM(Util, EventLib) {
    var onlineUsersListDivId = "onlineUsersListDiv";

    var onlineUsersListDiv = Util.getDOMElement(onlineUsersListDivId);
    var newUserDivContent = "" +
        "<span id = 'name' class='userName'>name</span>\n" +
        "<span id = 'status' class = 'userStatus'>status</span>";

    function appendUser(userId, name, status) {
        var userDetails = document.createElement("div");
        userDetails.classList.add("userDetails");
        userDetails.id = userId;
        userDetails.innerHTML = newUserDivContent;
        onlineUsersListDiv.appendChild(userDetails);
        updateUserOnlineStatus(userId, name, "name");
        updateUserOnlineStatus(userId, status, "status");
    }
    
    function updateUserOnlineStatus(userId, value, propName) {
        var userDiv = document.getElementById(userId);
        var userProps = userDiv.children;
        Util.any(userProps, function (userProp) {
            if (propName == "status" && userProp.id == propName) {
                userProp.innerText = (value == "1") ? "online" : "offline";
                return true;
            }
            if (propName == "name" && userProp.id == propName) {
                userProp.innerText = value;
                return true;
            }
        });
    }

    function updateUsersList(newUsersAdded) {
        Util.each(newUsersAdded, function addUsers(user) {
            var status = user.status,
                name = user.name,
                userId = user.userId;

            appendUser(userId, name, status);
        });
    }

    function attatchListenerOnUserOnlineStatusChange() {
        EventLib.addToEventQueue("gbl", "USERS_DETAILS", function (evt, statusChangedUsers) {
            Util.each(statusChangedUsers, function (userStatus, userId) {
                updateUserOnlineStatus(userId, userStatus, "status");
            })
        });
    }

    function attachListenerOnUserListClick() {
        onlineUsersListDiv.onclick = function (evt) {
            var userId = evt.target.id;
            EventLib.triggerEvent("gbl", "USER_LIST_CLICK", {
               "userId" : userId
            });
        };
    }
    
    function init() {
        attatchListenerOnUserOnlineStatusChange();
        attachListenerOnUserListClick();
    }

    init();

    return {
        updateUsersList : updateUsersList
    };
});