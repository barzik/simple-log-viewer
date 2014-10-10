/**
 * Created by ran on 10/10/14.
 */

var myLog = require('./lib/logOpener.js');


function Log() {
    if (false === (this instanceof Log)) {
        return new Log();
    }
}
Log.prototype.init = function (log_file_position, callback)  {
    myLog.init(log_file_position, callback);
}

Log.prototype.addToLog = function (log_item,callback) {
    myLog.addToLog(log_item,callback);
}

Log.prototype.createServer = function(port, callback) {
    myLog.createServer(port, callback);
}

module.exports = new Log();