const subscribers = {};


/**********************************
 * Get subscribers for an action
 * or an empty list
 **********************************/
function getSubscribers(action) {
    return subscribers[action] || [];
}


/**********************************
 * Subscribe a function to an action.
 * It's safe to subscribe multiple times
 * as the subscriber is only added once
 **********************************/
function subscribe (action, subscriber) {
    subscribers[action] = subscribers[action] || [];
    let subs = getSubscribers(action),
        i;

    for (i = 0; i < subs.length; i += 1) {
        if (subs[i] === subscriber) {
            return;
        }
    }

    subscribers[action].push(subscriber);
}


/**********************************
 * Unsubscribe a function from an action.
 **********************************/
function unsubscribe (action, subscriber) {
    var subs = _subscribers[action], i;
    if (subs === undefined) {
        return;
    }

    for (i = 0; i < subs.length; i += 1) {
        if (subs[i] === subscriber) {
            _subscribers[action].splice(i, 1);
        }
    }

    if (_subscribers[action].length === 0) {
        delete _subscribers[action];
    }
}


/**********************************
 * Publish an action to all subscribers
 **********************************/
function publish (action) {
    let args = [],
        i;

    for (i = 1; i < arguments.length; i += 1) {
        if (arguments[i]) {
            args.push(arguments[i])
        } else {
            break;
        }
    }

    let subs = getSubscribers(action);
    for (i = 0; i < subs.length; i += 1) {
        subs[i].apply(this, args);
    }
}

export  {
    subscribe,
    unsubscribe,
    publish
};
