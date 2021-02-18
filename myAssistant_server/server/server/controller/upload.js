/**
* This is the description for Upload API class. The initlaized request for CORS (different URL reuqest)
* is managed to support GET, POST, PUT, DELETE and OPTIONS.
* Browsers are sending an OPTIONS request for authorization before sending the actual request.
*
* API Library: /controller/upload
*
* This class is working on a REQUEST => RESPONSE approach
* Response return sattus:
*    200 OK successful GET
*    201 Created for successful POST.  URI for the created resource is specified in the Location header field
*    204 No Content for successful PUT and DELETE. No message body.
*    400 Bad Request with error, if the new resource to be created through POST already exists
*    404 Not Found with error, if GET or PUT has not found anything matching the Request-URI
*    415 Unsupported Media Type with error, if POST or PUT if the request body is not in application/json MIME type
*    500 Internal Server Error with error, if server encountered an unexpected error while processing the request
* 
* @class Upload
*
* @author Ahmed Benamrouche
* Date: May 2017
*/

var path = require('path');
var cors= require('cors');
var formidable = require('formidable');
var fs = require('fs');
let oracledb = require('oracledb');      // Oracle DB connection
var logger = require("../utils/logger.js");
let excel = require('exceljs');

module.exports = function (app, SQL) {

var module = {};

/**
* GET method description.  
* Http Method: GET
* URL        : /api/upload/
*
*
* @method get
* @param {Object} request HTTP request. The request must contain :
*       - USER in the header (for log)
*       - FILE
* @param {Object} response is the server response 
* @return {Boolean} Returns the item general information
*
*/
module.get = function (request,response) {
}


/**
* POST method description.  
* Http Method: POST
* URL        : /api/upload/
*
* URL        : /api/upload/1/ is the check content process request
* URL        : /api/upload/2/ is the validate and execute process
*
* @method post
* @param {Object} request HTTP request. The request must contain :
*       - USER in the header (for log)
*       - FILE
* @param {Object} response is the server response 
* @return {Boolean} Returns the item general information
*
*/
module.post = function (request,response) {

    app.post('/api/upload/', function (request, response) {
        // create an incoming form object
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        logger.log('[UPLOAD]', 'request : ' + request, 'upload', 2);
        console.log(request);
        var incoming = new formidable.IncomingForm();

        //Formidable uploads to operating systems tmp dir by default
        incoming.uploadDir = "../../uploads";       //set upload directory
        incoming.keepExtensions = true;     //keep file extension

        //logger.log('[UPLOAD]', request), user, 2);
        /* @fileBegin : Begains to upload files */
        incoming.on('fileBegin', (name, file) => {
            logger.log('[UPLOAD]', 'fileBegin : ' + name, 'upload', 2);
        });

        /* @error : On error We can send resposnse as failed with err message */
        incoming.on('error', err => logger.log('[UPLOAD]', 'files : ' + JSON.stringify(err), 'upload', 2));

        /* @end: When all the files are uploaded send response as success with success message */
        incoming.on('end', () => {
            logger.log('[UPLOAD]', 'Uploaded Successfully : ' + JSON.stringify(err), 'upload', 2);
        });

        incoming.parse(request, function(err, fields, files) {
            logger.log('[UPLOAD]', 'files : ' + JSON.stringify(files), 'upload', 2);
            response.setHeader('Access-Control-Allow-Origin', '*');
            // requestuest methods you wish to allow
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.write(JSON.stringify(files));
            console.log("form.bytesReceived");
            console.log('Files : ' + JSON.stringify(files));
            //TESTING
            console.log("file size: "+JSON.stringify(files.fileUploaded.size));
            console.log("file path: "+JSON.stringify(files.fileUploaded.path));
            console.log("file name: "+JSON.stringify(files.fileUploaded.name));
            console.log("file type: "+JSON.stringify(files.fileUploaded.type));
            console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

            //Formidable changes the name of the uploaded file 
            //Rename the file to its original name
            fs.rename(files.fileUploaded.path, './uploads/'+files.fileUploaded.name, function(err) {
            if (err) {
                console.log(JSON.stringify(err));
                response.write(JSON.stringify(err));
                response.end();
                return;
            }
            console.log('renamed complete');  
            });
            response.end();
            });
        });

    // Get template    
    app.get('/api/upload/0/', function (request, response) {
            "use strict";
            response.setHeader('Access-Control-Allow-Origin', '*');
            // requestuest methods you wish to allow
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            //module.executeLibQuery = function (queryNum, params, user, database_sid, language, request, response) 
            let templateFile;

            console.log('Getting request ' + JSON.stringify(request.query.PARAM))
            /**
             * 1 - Item Merhandise Hierarhy template
             * 2 - UPC change template
             */
            if (request.query.PARAM === 'ICR_TEMPLATE001') {
                templateFile= __dirname + '/../../templates/ICR_CATEGORY_CHANGE_TEMPLATE.xlsx'
            }

            // Check if file specified by the filePath exists 
            fs.exists( templateFile, function(exists){
                if (exists) {
                    // Content-type is very interesting part that guarantee that
                    // Web browser will handle response in an appropriate manner.
                    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    response.setHeader("Content-Disposition", "attachment; filename=" + 'ICR_CATEGORY_CHANGE_TEMPLATE.xlsx');

                    let workbook = new excel.Workbook();
                    workbook.xlsx.readFile(templateFile)
                        .then(function() {
                            return workbook.xlsx.write(response)
                                .then(function() {
                                    response.status(200).end();
                                });
                        });
                    //response.download(templateFile);
                    //fs.createReadStream(templateFile).pipe(response);
                    //response.end();

                } else {
                    logger.log('[UPLOAD]', 'file doesnt exist '  + templateFile, 'upload', 3);
                    response.write("ERROR Template does not exist");
                    response.status(200).end();
                }
            });
    });
        
    // Save changes in template 
    app.post('/api/upload/1/', cors(), function (request, response) {

        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.status(200);

        //console.log('/api/upload/1/ :', request);
        SQL.executeSQL(SQL.getNextTicketID(),
                        "MERGE INTO facquestion a " +
                        " USING (SELECT :param0 as fcqintid FROM DUAL ) b  " +
                        " ON (a.fcqintid = b.fcqintid) " +
                        " WHEN MATCHED THEN " +
                        "  UPDATE SET FCQQUESTION = :jsonquestion, FCQTAGS = :param2, " + 
                        "             FCQID = :param1, " +
                        "             FCQTAGSPROFIL = :param3, FCQDMAJ=SYSDATE, " + 
                        "             FCQUTIL = :jsonuser, FCQTECH = :param4, FCQDURATION = :param5 " +
                        " WHEN NOT MATCHED THEN " +
                        "  INSERT (FCQID, FCQQUESTION, FCQTAGS, FCQTAGSPROFIL, FCQTECH, FCQDURATION, FCQDCRE, FCQDMAJ, FCQUTIL) " +
                        "  VALUES (:param1, :jsonquestion, :param2, :param3, :param4, :param5, sysdate, sysdate, :jsonuser) " + 
                        " ",
                        {param0: request.query.PARAM[0],
                         param1: request.query.PARAM[1],
                         param2: request.query.PARAM[2],
                         param3: request.query.PARAM[3],
                         param4: request.query.PARAM[4],
                         param5: request.query.PARAM[5],
                         jsonquestion: JSON.stringify(request.body),
                         jsonuser: request.header('USER')},
                         request.header('USER'),
                         request,
                         response,
                         function (err, data) {
                             console.log('Update template ' + request.query.PARAM[1]);
                             if (err) {
                                logger.log('[UPDATE]', 'failed ' + request.query.PARAM[1]+ JSON.stringify(err), request.header('USER'), 3);
                                response.status(200).json({
                                    RESULT: -1,
                                    MESSAGE: JSON.stringify(err)
                                });  
                             }
                             else {
                                //logger.log('[UPDATE]', 'template ' + request.query.PARAM[1] + ' processed', request.header('USER'), 1);
                                response.status(200).json({
                                    RESULT: 1,
                                    MESSAGE: JSON.stringify(err)
                                });  
                            }
            });
    });

        /** EXECUTION */
    app.post('/api/upload/2/', function (request, response) {
            "use strict";
            response.setHeader('Access-Control-Allow-Origin', '*');
            // requestuest methods you wish to allow
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //module.executeLibQuery = function (queryNum, params, user, database_sid, language, request, response) 

            //console.log('/api/upload/1/ :', request);
            SQL.executeSQL(SQL.getNextTicketID(),
                            "INSERT INTO JSON_INBOUND (jsonuserid, jsonutil, jsonfile, jsoncontent, jsonnbrecord, jsonparam, jsonsid, jsonlang, jsonstatus,  " +
                                                      " jsonimmediate, jsondsched, jsontrace, jsonstartdate) " +
                            " values (:jsonuserid, :jsonutil,  :jsonfile, :jsoncontent, :jsonnbrecord, :jsonparam, :jsonsid, :jsonlang, :jsonstatus, " +
                                    request.query.PARAM[3] + ',' +  // Immediate
                                    "to_date('" + request.query.PARAM[4] + "', 'MM/DD/RR hh24:mi' ) " + ',' +  // Scheduled date
                                    request.query.PARAM[2] + ',' +  // Trace
                                    "to_date('" + request.query.PARAM[1] + "', 'MM/DD/RR' ) ) " +  // Start date
                                    " returning jsonid into :cursor",
                            {jsonuserid: request.header('USER'),
                             jsonutil: request.header('USER'),
                             jsonfile: request.header('FILENAME'), 
                             jsonstatus: 0,
                             jsoncontent: JSON.stringify(request.body), 
                             jsonnbrecord: request.query.PARAM[5], 
                             jsonparam: "{" + request.query.PARAM + "}",
                             jsonsid: request.header('DATABASE_SID'), 
                             jsonlang: request.header('LANGUAGE'),
                             cursor: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
                             request.header('USER'),
                             request,
                             response,
                             function (err, data) {
                                 logger.log('[UPLOAD]', + JSON.stringify(data), 'upload', 3);
                                 if (err) {
                                    response.json({
                                        RESULT: -1,
                                        MESSAGE: JSON.stringify(err)
                                    });  
                                 }
                                 else {
                                     /** Return the JSON INBOUND id */
                                    response.json({
                                        RESULT: data,
                                        MESSAGE: ''
                                    });    
                                }
                });
            });
    };

   return module;
}