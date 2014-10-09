/**
 * Created by ran on 08/10/14.
 */


var myLog = require('./lib/logOpener.js')

myLog.init('logfile.log'); //init module

myLog.createServer(); //You can specify port number here

//myLog.addToLog('Some Log Item');

