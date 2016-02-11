var uuid = require('uuid');

var __switchboard = new Object();
__switchboard.connections = null;
__switchboard.inWaiting = null;

/**
 * Creates a new __switchboard instance and prepares it to receive incoming connections
 **/
__switchboard.create = function () {
    __switchboard.connections = new Map();
    __switchboard.inWaiting = new Map();

    if (__switchboard.connections && __switchboard.inWaiting) {
        return true;
    } else {
        return false;
    }
};

/**
 * Adds a connection between two points to the __switchboard
 * @param conn1 The first connection we are trying to make
 * @param conn2 The second connection we are trying to make
 * @param uniqueID Optional parameter that allows a unique ID to be passed in to identify the connection
 *         If an id isn't passed in the __switchboard will create one for you
 **/
__switchboard.addConnection = function (conn1, conn2, uniqueID) {
    if (!uniqueID) {
        uniqueID = uuid.v1();
    }
    __switchboard.connections.set(uniqueID, new __switchboard.connection(uuid, conn1, conn2));
};

/**
 * Removes a connection from the __switchboard
 * @param id The unique identifier that links these two connections
 **/
__switchboard.removeConnection = function (id) {
    return __switchboard.connections.delete(id);
};

/**
 * Returns a connection object based on the unique id being looked up
 **/
__switchboard.getConnection = function (id) {
    return __switchboard.connections.get(id);
};

/**
 * Creates a connection object that represents a connection between two 
 * entities (sockets, ports, etc.)
 **/
__switchboard.connection = function (id, conn1, conn2) {
    return {
        "id": id,
        "conn1": conn1,
        "conn2": conn2
    };
};

/**
 * 
 **/
__switchboard.setupConnection = function (conn, id) {
    if (!__switchboard.inWaiting.has(id)) {
        __switchboard.inWaiting.set(id, conn);
        return false;
    } else {
        __switchboard.addConnection(__switchboard.inWaiting.get(id), conn, id);
        __switchboard.inWaiting.delete(id);
        return true;
    }
};

/**
 * returns the underlying map, useful for testing
 **/
__switchboard.getConnectionMap = function () {
    return __switchboard.connections;
};

/**
 * Returns the underlying inWaiting map, useful for testing
 **/
__switchboard.getInWaitingMap = function () {
    return __switchboard.inWaiting;
};

module.exports = __switchboard;