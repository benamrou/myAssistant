/**
* This is the description for LOGGER API class. This class manages and generates the LOG file structure.
* The log foldes logs is structures by apps name then date then user logs.
* Ecample :
*     logs > admin > 2.13.2017 > internal.log (contains SERVER internal logs)
* 
* Server is expecting USER in the header request transaction. Therefor logs are generated by user at a given date
*
* API Library: /utils/logger
*
* This class is working on a REQUEST => RESPONSE approach
*
* @class LOGGER
*
* @author Ahmed Benamrouche
* Date: February 2017
*/
var fs = require('fs-extra'); // File management
var _= require("lodash");

function timestampLog() {
    var date = new Date();
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  
                    date.getFullYear() + " " + date.getHours() + ":" + 
                    date.getMinutes() + ":" + date.getSeconds();
}

function folderDateLog() {
    var date = new Date();
    return (date.getMonth() + 1) + '.' + date.getDate() + '.' +  
                    date.getFullYear();;
}

function buildLogStructure () {
    var timestamp = folderDateLog();
    fs.existsSync("logs/") || fs.mkdirSync("logs");
    fs.existsSync("logs/admin/") || fs.mkdirSync("logs/admin/");
    fs.existsSync("logs/admin/"+timestamp) || fs.mkdirSync("logs/admin/"+timestamp);
}


function logParam (uniqueId, parameters, username) {
    log(uniqueId,"\r\n", username);
    console.dir(parameters, {showHidden: false, depth: null});;
    logFile(uniqueId, JSON.stringify(parameters) + "\r\n", username);

}

function logFile(uniqueId, message, username) {
    var date = new Date();
    var timestamp = folderDateLog();
    buildLogStructure();

    fs.appendFileSync('logs/admin/' + timestamp + "/" + username + ".log", message, 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    });

}


/**
* LOG method description. Log function is the main function, capturing and 
* archiving the log message in the file structure and console file
*
* @method log
* @param {Integer} uniqueID represent the logID (equence number) - Reset to 0 if server is restarting
* @param {String} message is the message to be displayed/archived
* @param {String} username is the user requesting the transaction
*
* A log is generated in the server log file and logs folder
*
*/
function log (uniqueId, message, username, level) {
    var timestamp = timestampLog();
    var printMessage = timestamp + " [" + username + "] " + uniqueId  + ": " + JSON.stringify(message) + '\n';

    if (level) {
        if (level === 0 ) {
            console.log(printMessage);
        }
        if (level === 1) {
            console.log(printMessage);
        }
        if (level === 2) {
            // yellow character
            console.log('\x1b[33m%s\x1b[0m',printMessage);
        }
        if (level === 3) {
            // Red and white character
            console.log('\x1b[41m%s\x1b[0m', printMessage);
        }
    }
    else {
        console.log(printMessage);
    }

    logFile(uniqueId, printMessage, username);
};

module.exports.log = log; 