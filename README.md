# Simple Log Viewer

Node.js module intended for watching simple log file and view this file on user's browser.
Without any configurations, settings and install. just name the log file place and that's it! the user is being able to view the log file by going to the IP:3000 (You can change the port). the user will view the last 10 entries and every new entry will appear immediatly in the browser.

## How to use

You can view app.js for example and for live example just "nodejs app.js".

	var myLog = require('./lib/logOpener.js'); //require (to be replaced with npm)

	myLog.init('logfile.log');  //initiate the logfile

	myLog.createServer(); //create the server - from this point you can go to localhost:3000 or IP:3000 and You will see the log file.

	myLog.addToLog('Some log entry'); //You can add items to log using this method.