/**
 * Created by ankit on 21/2/18.
 */

mnDefineX ("NavBarHandler", ["Util"], function (Util) {
    var navBarId = "navDiv",
        userDivId = "userDiv";

    var navBar = Util.getDOMElement(navBarId),
        userDiv = Util.getDOMElement(userDivId);


    function setUserName(username) {
        userDiv.innerText = username;
    }

    return {
        setUserName : setUserName
    };
});