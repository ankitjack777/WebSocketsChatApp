/**
 * Created by ankit on 21/2/18.
 */
mnDefineX("Util", [], function() {

    function getDOMElement(elem, doc) {
        if (!elem)
            return null;
        doc = doc || document;
        var specifier = elem.charAt(0);
        switch (specifier) {
            case "#" :
                elem = elem.substring(1, elem.length);
                return doc.getElementById(elem);
                break;
            default :
                return doc.getElementById(elem);
                break;
        }
    }

    function addScript(url) {
        var scr=document.createElement("script");
        scr.text="text/javascript";
        scr.src = url;
        document.body.appendChild(scr);
    }

    function addItems(originalList, listToAdd) {
        for (var item in listToAdd) {
            if (!listToAdd.hasOwnProperty(item) || originalList[item]) {
                continue;
            }
            originalList[item] = listToAdd[item];
        }
    }

    function removeItems(originalList, listToRemove) {
        for (var item in originalList) {
            if (!listToRemove.hasOwnProperty(item) || !originalList[item]) {
                continue;
            }
            delete originalList[item];
        }
    }

    function isFunction(reference) {
        return typeof reference === "function";  // make sure
    }

    function isString(str) {
        return typeof str === 'string';
    }

    function isObject(obj) { //this function is useless remove this and all its usages
        return obj !== null && typeof obj === 'object' ; // what about null ? // null case is now been handled
    }

    function isDefined(o) {
        return o !== undefined;
    }

    function isEmptyString(str) {
        return isString(str) && str.length === 0;
    }

    function isNumber(num) {
        return !(isNaN(num) || num === undefined || num === null);
    }

    function isArray(item) {
        return Object.prototype.toString.call(item) === '[object Array]';
    }

    function isSet(val) {
        switch (typeof val) {
            case "string":
                return val !== undefined && val !== "" && val !== null;
            case "object":
                return val !== null;
            case "number":
                return true;
            case "boolean":
                return !!val;
            default:
                return false;
        }
    }

    function isStringSet(str) {
        return str !== undefined && str !== "" && str !== null;
    }

    function extend(destination, source) {
        if (typeof source === "undefined") {
            return destination;
        }
        destination = destination || {};
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }


    function replaceAll(str, find, replace) {
        if (!str)
            return "";
        return str.replace(new RegExp(find, 'g'), replace);
    }


    //call ur callback for each value and store them in array and return array

    function map(obj, callback) {
        if (!isSet(obj)) {
            return [];
        }
        var toRet;
        if (!isFunction(callback)) {
            callback = function(val, key) {
                return !!val;
            };
        }
        var i = 0,
            length = obj.length;

        if (isArray(obj)) {
            toRet = [];
            for (; i < length; i++) {
                toRet.push(callback.call(obj[i], obj[i], i));
            }
        } else {
            toRet = {};
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    toRet[i] = callback.call(obj[i], obj[i], i);
                }
            }
        }
        return toRet;
    }

    //calls ur callback - 2 paramters -
    // 1)  previous result|initial value
    // 2)  for each value of array
    //finally return the single result

    function reduce(obj, callback, initialValue) {
        if (!isFunction(callback)) {
            return;
        }
        var value,
            i,
            l;
        if (isArray(obj)) {
            i = 0;
            l = obj.length;
            if (typeof initialValue !== 'undefined') {
                value = initialValue;
            } else {
                while (i < l && !(i in obj)) {
                    i++;
                }
                if (i >= l) {
                    return;
                }
                value = obj[i++];
            }
            for (; i < l; i++) {
                if (i in obj) {
                    value = callback(value, obj[i], i, obj);
                }
            }
            return value;
        }
        initialValue = initialValue || '';
        value = initialValue;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                value = callback(value, obj[i], i, obj);
            }
        }
        return value;
    }


    //just all ur callback - for each value
    //nothing is returned

    function each(obj, callback) {
        if (!isSet(obj)) {
            return;
        }
        var i = 0,
            length = obj.length;

        if (isArray(obj)) {
            for (; i < length; i++) {
                callback.call(obj[i], obj[i], i, length);
            }
        } else {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    callback.call(obj[i], obj[i], i, 0);
                }
            }
        }
    }


    //returns filtered[] of values which satifies
    //works for object and array

    function filter(obj, callback) {
        if (!isSet(obj)) {
            return [];
        }
        var toRet;
        if (!isFunction(callback)) {
            callback = function(val, key) {
                return !!val;
            };
        }
        var i = 0,
            length = obj.length;

        if (isArray(obj)) {
            toRet = [];
            for (; i < length; i++) {
                if (callback.call(obj[i], obj[i], i)) {
                    toRet.push(obj[i]);
                }
            }
        } else {
            toRet = {};
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (callback.call(obj[i], obj[i], i)) {
                        toRet[i] = obj[i];
                    }

                }
            }
        }
        return toRet;
    }

// if any1 is set, it will return that value - and not traverse rest of values
    //can iterate on object or array

    function any(obj, callback) {
        if (!isSet(obj)) {
            return;
        }
        if (!isFunction(callback)) {
            callback = function(val, key) {
                return !!val;
            };
        }
        var i = 0,
            length = obj.length,
            returnValue;

        if (isArray(obj)) {
            for (; i < length; i++) {
                returnValue = callback.call(obj[i], obj[i], i);
                if (isSet(returnValue)) {
                    return returnValue;
                }
            }
        } else {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    returnValue = callback.call(obj[i], obj[i], i);
                    if (isSet(returnValue)) {
                        return returnValue;
                    }
                }
            }
        }
    }

    function inherits(src, superclass) {
        src.super_ = superclass;
        for (var i in superclass.prototype) {
            src.prototype[i] = superclass.prototype[i];
        }
        src.prototype.constructor = src;
    }

    var eventLib = {
        addEvent: function (elem, type, eventHandle) {
            if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
                elem.attachEvent("on" + type, eventHandle);
            }
            elem = null; // Handle Memory Leak
        },
        removeEvent: function (elem, type, eventHandle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, eventHandle);
            } else if (elem.detachEvent) {
                elem.detachEvent('on' + type, eventHandle);
            }
            elem = null;
        }
    };



    return {
        getDOMElement : getDOMElement,
        addScript : addScript,
        addItems : addItems,
        removeItems : removeItems,


        isSet : isSet,
        isFunction: isFunction,
        isArray: isArray,
        isSet: isSet,
        isStringSet: isStringSet,
        isNumber: isNumber,
        inherits: inherits,
        map: map,
        each: each,
        any: any,
        filter: filter,
        reduce: reduce,
        eventLib: eventLib
    }
});