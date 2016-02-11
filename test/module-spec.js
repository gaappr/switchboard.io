var assert = require('assert');
var switchboard = require('../index.js');
//var switchboard = new Switchboard();

describe('Swithchboard Tests', function(){
    
    describe('Map Creation', function(){
        it('Should create two maps', function(){
            var created = switchboard.create();
            assert.equal(created, true);
            assert.equal(switchboard.getConnectionMap().size, 0);
            assert.equal(switchboard.getInWaitingMap().size, 0);
        });
    });
    
    describe('Working with connections that have ids', function(){
        it('Add a connection to inWaiting', function(){
            switchboard.setupConnection('value','key');
            assert.equal( switchboard.getInWaitingMap().has('key'), true );
            assert.equal( switchboard.getInWaitingMap().get('key'), 'value');
        });
        
        it('Find a matching connection and pair them off', function(){
            switchboard.setupConnection('value2','key');
            assert.equal( switchboard.getInWaitingMap().size, 0);
            assert.equal( switchboard.getConnectionMap().size, 1);
            assert.equal( switchboard.getConnection('key').conn1, "value");
        }); 
        
        it('Clear the map of an existing connection', function(){
            switchboard.removeConnection('key');
            assert.equal(switchboard.getConnectionMap().size, 0);
        });
    });
    
    describe('Working with connections that have no ID initially', function(){
        var conn1ID, conn2ID;
        it('Add two connections with no id', function(){
            conn1ID = ( switchboard.setupConnection('anonConnection1') ).id;
            conn2ID = ( switchboard.setupConnection('anonConnection2') ).id;
            assert.equal(switchboard.getInWaitingMap().size,2);
        });
        
        it('Pair off the two anonymous connections', function(){
            switchboard.setupConnection('anonConnection1_pair', conn1ID);
            switchboard.setupConnection('anonConnection2_pair', conn2ID);
            assert.equal(switchboard.getInWaitingMap().size,0);
            assert.equal(switchboard.getConnectionMap().size,2);
            assert.equal(switchboard.getConnection(conn1ID).id, conn1ID);
            assert.equal(switchboard.getConnection(conn2ID).id, conn2ID);
            assert.equal(switchboard.getConnection(conn1ID).conn1, 'anonConnection1');
            assert.equal(switchboard.getConnection(conn2ID).conn1, 'anonConnection2');
        });
        
        it('Remove the two anonymous connections', function(){
            switchboard.removeConnection(conn1ID);
            switchboard.removeConnection(conn2ID);
            assert.equal( switchboard.getConnectionMap().size, 0 );
            assert.equal( switchboard.getInWaitingMap().size, 0 );
        });
    });
    
});
