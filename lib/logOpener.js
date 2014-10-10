/**
 * Created by ran on 08/10/14.
 */

var Log = function () {};

var fs = require('fs');
var stream = require('stream');

app = require('http').createServer(handler);
io = require('socket.io')(app);

/**
 * public variable: the position of the log file
 * @type {{log_file_position: string}}
 */

Log.prototype = {
    log_file_position :''
}

/**
 *
 * init public function
 *
 * @param log_file_position
 */

Log.prototype.init = function (log_file_position, callback) {
    if(typeof callback == 'undefined') {
        callback = function() {};
    }
    prepareLogFilePosition(log_file_position, function() {
        callback();
    });
};

/**
 *
 * adding log event public function
 *
 * @param log_item
 */

Log.prototype.addToLog = function (log_item,callback) {
    if(typeof callback == 'undefined') {
        callback = function(){};
    }
    writeToLog(log_item, function() {
        callback(true);
    });
};

/**
 *
 * create server public function
 *
 */

Log.prototype.createServer = function(port, callback) {
    if(typeof port == 'undefined') {
        port = 3000;
    }
    if(typeof callback == 'undefined') {
        callback = function() {};
    }


    var port = process.env.PORT || port;
    app.listen(port, function() {
        console.log('simple log viewer server created');
        callback();
    });

    watchFile();
    io.on('connection', function (socket) {
        readLogFile(function(statement,last_line_of_text) {
            last_lines = statement.slice(-10);
            socket.emit('initial-log', last_lines);
        });

    });

}

/**
 *
 * private function
 * watching for file changes
 *
 */

function watchFile() {
    fs.watchFile(log_file_position, function (curr, prev) {
        readLogFile(function(statement,last_line_of_text) {
            io.sockets.emit('log-event', last_line_of_text)
        });

    });
}

/**
 *
 *  private function
 *  reading the log file and stream the results
 *
 */

function readLogFile(callback) {
    var instream = fs.createReadStream(log_file_position);

    var data = "";

    instream.on('readable', function() {
        data += instream.read();
        while( data.indexOf('\n') >= 0 ){
            instream.emit('newLine', data.substring(0,data.indexOf('\n')));
            data = data.substring(data.indexOf('\n')+1);
        }
    });

    instream.on('end', function() {
        instream.emit('newLine', data , true);
    });

    var statement = [];

    instream.on('newLine',function(line_of_text, end_of_file){
        statement.push(line_of_text);

        if(end_of_file){

            callback(statement,line_of_text);
        }
    });

}

/**
 *
 * handler private function for the http server
 *
 * @param req
 * @param res
 */

function handler  (req, res) {
    fs.readFile(__dirname + '/view/index.html', //reading the file
        function (err, data) { //calback that get fired right after the file was created
            if (err) { //if callback return error.
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200); //returning 200
            res.end(data); //printing the data - the index.html content
        });


}

/**
 *
 * private function: handle the log file position given by the user
 * if the log file is not there - create it
 * throw error if location is directory
 *
 * @param log_file_position
 */

function prepareLogFilePosition(log_file_position, callback) {
    if (fs.existsSync(log_file_position)) {
        console.log('Log file existing');
        var stats = fs.lstatSync(log_file_position);
        if(!stats.isFile()) {
            throw new Error('Path is not a file.');
        }
        this.log_file_position = log_file_position;
        callback();
    } else {
        fs.open(log_file_position, 'a', function() {
            this.log_file_position = log_file_position;
            callback();
        });

    }
}

/**
 *
 * writing to log
 *
 * @param log_item
 */

function writeToLog(log_item,callback) {
    fs.appendFile(log_file_position, "\n"+log_item, function (err) {
        if (err) {
            throw err;
        }
        fs.stat(log_file_position, function (err, stats) {
            if (err) throw err;
            callback(log_item);
        });

    });
}





module.exports = new Log();


