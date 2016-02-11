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
    
    describe('Adding Connections', function(){
        it('Should add a connection to inWaiting', function(){
            switchboard.setupConnection('value','key');
            assert.equal( switchboard.getInWaitingMap().has('key'), true );
            assert.equal( switchboard.getInWaitingMap().get('key'), 'value');
        });
        
        it('Should find a matching connection and pair them off', function(){
            switchboard.setupConnection('value2','key');
            assert.equal( switchboard.getInWaitingMap().size, 0);
            assert.equal( switchboard.getConnectionMap().size, 1);
            assert.equal( switchboard.getConnection('key').conn1, "value");
        }); 
    });
    
    describe('Removing Connections', function(){
        it('should clear the map of an existing connection', function(){
            switchboard.removeConnection('key');
            assert.equal(switchboard.getConnectionMap().size, 0);
        });
    });
    
});
