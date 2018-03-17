/**
 * Created by ankit on 24/2/18.
 */

mnDefineX("OnlineUsersHandler", ["EventLib", "OnlineUsersDOM", "Util"] , function onlineUsersHandler(EventLib, OnlineUsersDOM, Util) {

    var onlineUsersList = {};//userId - name,status
   
    function processOnlineUsersList(userIds, userNames, usersOnlineStatus) {

        var res = addUsers(userIds, userNames, usersOnlineStatus);

        if (res.newUsersAdded.length != 0) {
            OnlineUsersDOM.updateUsersList(res.newUsersAdded);
        }

        EventLib.triggerEvent("gbl", "USERS_DETAILS", {
           "statusChangedUsers" : res.statusChangedUsers
        });
    }

    function addUsers(userIdsList, userNamesList, usersOnlineStatus) {
        var newUsersAdded = [],
            statusChangedUsers = {};

        Util.each(userIdsList, function (userId, index) {
            var userDetail = onlineUsersList[userId];
            if (userDetail) {

                if (userDetail.status != usersOnlineStatus[index]){
                    if (userDetail.status == "0") {
                        statusChangedUsers[userId] = "1";
                        userDetail.status = "1";
                    }
                    else {
                        statusChangedUsers[userId] = "0";
                        userDetail.status = "0";
                    }
                }
                return;
            }
            var username = userNamesList[index];

            onlineUsersList[userId] = {
                "name" : username,
                "status" : usersOnlineStatus[index] || "1"
            };

            newUsersAdded.push({
                "userId" : userId,
                "name" : username,
                "status" : usersOnlineStatus[index] || "1"
            });
        });

        return {
            newUsersAdded : newUsersAdded,
            statusChangedUsers: statusChangedUsers
        };
    }

    function updateUsersStatus(userIds, userStatus) {
        if (!Util.isSet(userStatus))
            return;
        if (userStatus.length == 0)
            return;
        processOnlineUsersList(userIds, null, userStatus);
    }

    return {
        processOnlineUsersList : processOnlineUsersList,
        updateUsersStatus : updateUsersStatus
    };
});