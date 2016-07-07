﻿var spaMVP = (function (spaMVP) {
    var _core = null;

    /**
     *  @class spaMVP.Sandbox
     *  @property {string} moduleInstanceId
     */
    function Sandbox(core, moduleInstanceId) {
        _core = core;
        this.moduleInstanceId = moduleInstanceId;
    }

    /**
     *  Publishes an event to the subscribers.
     *  @param {String} eventType - Type of the event.
     *  @param {*} [data] - Optional data.
     */
    Sandbox.prototype.publish = function (eventType, data) {
        if (typeof eventType === 'string') {
            _core.publish(eventType, data);
        }
    };

    /**
     *  Subscribes for specific events.
     *  @param {Array} eventTypes - Array of events to subscribe for.
     *  @param {Function} handler - The events' handler.
     *  @param {Object} context - Handler's context.
     */
    Sandbox.prototype.subscribe = function (eventTypes, handler, context) {
        if (!Array.isArray(eventTypes)) {
            throw new TypeError('Event types must be an array');
        }

        if (typeof handler !== 'function') {
            throw new TypeError('Event type handler must be a function');
        }

        _core.subscribe(eventTypes, handler, context);
    };

    /**
     *  Unsubscribes for specific events.
     *  @param {Array} eventTypes - Array of events to unsubscribe for.
     *  @param {Function} handler - The handler which must be unsubscribed.
     *  @param {Object} context - Handler's context.
     */
    Sandbox.prototype.unsubscribe = function (eventTypes, handler, context) {
        if (Array.isArray(eventTypes)) {
            _core.unsubscribe(eventTypes, handler, context);
        }
    };

    /**
     *  Gets a service instance from the application core.
     *  @param {String} id
     *  @returns {Object}
     */
    Sandbox.prototype.getService = function (id) {
        return _core.getService(id);
    };

    spaMVP.Sandbox = Sandbox;
    return spaMVP;

}(spaMVP || {}));