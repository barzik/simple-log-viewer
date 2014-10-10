# Simple Log Viewer

Node.js module intended for watching simple log file and view this file on user's browser.
Without any configurations, settings and install. just name the log file place and that's it! the user is being able to view the log file by going to the IP:3000 (You can change the port). the user will view the last 10 entries and every new entry will appear immediatly in the browser.

## How to use

    var myLog = require('simple-log-viewer');
    
    myLog.init('logfile.log'); //init module with log file name
    
    myLog.createServer(); //You can specify port number here
    
    myLog.addToLog('Some Log Item');
    
    myLog.addToLog('Some Log Item2');
    
    myLog.addToLog('Some Log Item3');

	
## How to test

Testing as being made with Mocha. just "make test" from root directory and that's it!