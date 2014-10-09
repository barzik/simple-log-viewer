/**
 * Created by ran on 08/10/14.
 */


var myLog = require('./lib/logOpener.js')

myLog.init('/home/ran/www/simple-log-viewer/logfile.log');

myLog.createServer();

myLog.addToLog('hahahahssssa1');

