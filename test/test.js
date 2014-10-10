/**
 * Created by ran on 10/10/14.
 */

var assert = require("assert"); // core module
var fs = require("fs");
var http = require('http');
var myLog = require('./../lib/logOpener.js');
var test_log_file = 'testLogFile.log';
var io = require('socket.io-client');



describe('Simple Log Viewer', function(){
    describe('Basic methods and module', function(){
        it('should have a createServer Method', function(){
            assert.equal(typeof myLog, 'object');
            assert.equal(typeof myLog.createServer, 'function');
        })
        it('should have a addToLog Method', function(){
            assert.equal(typeof myLog, 'object');
            assert.equal(typeof myLog.addToLog, 'function');
        })
        it('should have a public log_file_position property after init', function(){
            assert.equal(typeof myLog, 'object');
            myLog.init(test_log_file);
            assert.equal(typeof myLog.log_file_position, 'string');

        })
    });

    describe('File Operations', function(){
        before(function(done){
            myLog.init(test_log_file, function() {done();});
        });
        it('should create log file on init', function(){
            var stats = fs.lstatSync(test_log_file);
            assert.equal(stats.isFile(), true);
            assert.equal(typeof myLog.createServer, 'function');
        });
        it('should create log item on file when using addToLog', function(){
            myLog.addToLog('log item event #1', function() {
                fs.stat(test_log_file, function(err,stat) {
                    if (err) throw err;
                    stat_size = stat['size'];
                    assert.notEqual(stat_size, 0);
                })

            });
        });


    });

    describe('Server Operations', function(){
        before(function(done){
            myLog.init(test_log_file, function() {
                myLog.addToLog('log item event #1', function() {
                    myLog.createServer(3000, function() {
                        done();
                    });
                });
            });

        });
        it('should return 200', function (done) {
            http.get('http://localhost:3000', function (res) {
                assert.equal(200, res.statusCode);
                done();
            });
        });

        it('should get the socket initial request', function (done) {
            var socket = io.connect('http://localhost:3000');
            socket.on('connect', function() {
                socket.on('initial-log', function(data){
                    assert.notEqual(data.length, 0);
                    done();
                });
            });
        });



    });
    after(function(){
        fs.exists(test_log_file, function(exists) {
            if (exists) {
                fs.unlinkSync(test_log_file); //delete it
            }
        });
    });

});