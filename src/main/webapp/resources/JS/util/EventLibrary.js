/**
 * Created by ankit on 24/2/18.
 */
mnDefineX('EventLib',
    [],
    function EventManager() {
        var _mNX = {};

        // ### Add to Event Queue
        // Adds a event listener to given custom event type
        /**
         * @param {string} type
         * @param {string} tag
         * @param {Function} listener
         */
        function addToEventQueue(type, tag, listener) {
            var uid = 'evt_' + (tag || "gbl");
            _mNX[uid] = _mNX[uid] || {};
            _mNX[uid][type] = _mNX[uid][type] || [];
            _mNX[uid][type].push(listener);
        }

        function isFunction(reference) {
            return typeof reference === "function";
        }

        // Triggers custom events; Handlers execute synchronously
        /**
         * @param {string} tag
         * @param {string} type
         * @param {boolean|Object} [preventDelete]
         * @param {Object} [customParams]
         */
        function triggerEvent(tag, type, preventDelete, customParams) {
            customParams = customParams || (typeof preventDelete === "object" ? preventDelete : {});
            preventDelete = typeof preventDelete === 'boolean' ? preventDelete : false;
            var uid = 'evt_' + (tag || "gbl");
            if (_mNX[uid] === undefined) {
                return;
            }

            var eventListeners = _mNX[uid][type] || [],
                j,
                i,
                event = {
                    _mNX: _mNX,
                    type: type
                };


            for (i = 0, j = eventListeners.length; i < j; i++) {
                if (isFunction(eventListeners[i])) {
                    eventListeners[i].call(this, event, customParams);
                }
            }
            if (!preventDelete && eventListeners.length > 0) {
                _mNX[uid][type] = [];
            }
        }

        return {
            triggerEvent: triggerEvent,
            addToEventQueue: addToEventQueue
        };
    }
);