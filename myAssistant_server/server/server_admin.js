/*jslint node:true*/

// **************************************************************************************/
// This serve manage the back-end connection to the myAssistant application
//
// Environment letiable:
//     NODE_ENV: which environment configuration to be used (production/development/testing)
//               if not set by default ./config/development.js config file
//     COOKIE_SECRET_KEY:
//     REDIS_URL: URL distribution
//
// Creation date: 01/2017
// Author: Ahmed Benamrouche
//
// **************************************************************************************/

let http = require('http');
let express = require('express');        // Manage client request
let cors = require('cors');              // Cors management
let bodyParser = require('body-parser'); // Parse JSON file
let oracledb = require('oracledb');      // Oracle DB connection
let fs = require('fs-extra'); // File management
let _= require("lodash");
let inherits = require("inherits");

let openHttpConnections = {};
let httpServer;
//let _= require(["underscore"]); // User to concatenate array for parameters

// Config - by default Development is Envrionment variable NODE_ENV is not set to production
// Config - Merging default with the Production or Development or Testing config file
let defaults = require("./config/default.js");
let config = new require("./config/" + (process.env.NODE_ENV || "development") + ".js");
module.exports = _.merge({}, defaults, config);

let app = express();

process.env.UV_THREADPOOL_SIZE=264;

// parse application/json
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));      // to support JSON-encoded bodies
// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({
         extended: true
    }) 
);

app.use(bodyParser());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "*"
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(function(req, res, next) {
	if (req.method === 'OPTIONS') {
	      console.log('!OPTIONS');
	      let headers = {};
	      // IE8 does not allow domains to be specified, just the *
	      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	      headers["Access-Control-Allow-Origin"] = "*";
    	  headers["Access-Control-Allow-Credentials"] = true;
    	  headers["Access-Control-Allow-Methods"] = "GET, HEAD, OPTIONS, POST, PUT, DELETE, PATCH";
    	  headers["Access-Control-Allow-Headers"] = "Access-Control-Allow-Headers, Origin,Accept, " +
                                                    "Cache-Control, Pragma, Origin, Authorization, " +
                                                    "X-Requested-With, Content-Type, " +
                                                    "Access-Control-Request-Method, " +
                                                    "Access-Control-Request-Headers, " +
                                                    "USER, PASSWORD, " +
                                                    "DATABASE_SID, LANGUAGE, " +
                                                    "DSH_ID, QUERY_ID," +  
                                                    "MODE, FILENAME," +
                                                    "ENV_ID, ENV_PASS, ENV_IP, ENV_COMMAND";
	      res.writeHead(200, headers);
	      res.end();
	}
	else {
		next();
	}
});


/* Publish the available routes and methodes */
let dbConnection = require('./server/utils/dbconnect');
let SQL = require('./server/utils/sqlquery.js');
let authentification=	require('./server/controller/authentification.js')(app, SQL);
let query = require('./server/controller/query')(app, SQL);
let user=	require('./server/controller/user.js')(app, SQL);
let environment=	require('./server/controller/environment.js')(app, SQL);
let upload = require('./server/controller/upload')(app, SQL);
let command = require('./server/controller/command/execute')(app, SQL);
let logger = require('./server/utils/logger.js');     // Log manager
let notification = require('./server/controller/notification')(app, SQL);
let crontab = require('./server/controller/crontab')(app, SQL);
let label = require('./server/controller/labels')(app, SQL);


//dbConnection.createPool('dd');
authentification.get(app,oracledb);
authentification.post(app,oracledb);
user.get(app,oracledb);
environment.get(app,oracledb);
command.get(app,oracledb);
notification.get(app, oracledb);
query.get(app, oracledb);
label.get(app, oracledb);
upload.get(app, oracledb);
upload.post(app, oracledb);

// Prepare logs folder/files
// File folder for logs
// logs > admin > date (format - YYYYMMDD)
let date = new Date();
let timestamp = (date.getFullYear() + "." + (date.getMonth() + 1) + '.' + date.getDate());

let argv = process.argv.slice(2);

if (argv.length < 2) {
    console.log('\x1b[41m%s\x1b[0m', 'Listening port number is required');
    console.log('\x1b[41m%s\x1b[0m', 'Example: nodemon server_admin.js package.json 8090 ');
    process.exit();
}

if (argv[2] === 'CRONTAB') {
    crontab.process(app, oracledb);
}

// Logs file structure is ready


httpServer = http.Server(app);
httpServer.timeout = config.server.timeout;
httpServer.on('connection', function(conn) {
        var key = conn.remoteAddress + ':' + (conn.remotePort || '');

        openHttpConnections[key] = conn;

        conn.on('beforeExit', function() {
            dbConnection.getPool().close();
            delete openHttpConnections[key];
        });

        conn.on('close', function() {
            try { 
                delete openHttpConnections[key]; 
            } 
            catch (error ) {};
            
        });
    });

// process.on('unhandledRejection', up => { throw up });

// Connection to the database and listenning the server
dbConnection.addBuildupSql({
	sql: "BEGIN EXECUTE IMMEDIATE q'[alter session set NLS_DATE_FORMAT='DD-MM-YYYY']'; END;"
});

dbConnection.addTeardownSql({
	sql: "BEGIN sys.dbms_session.modify_package_state(sys.dbms_session.reinitialize); END;"
});

dbConnection.createPool(config.db.connAttrs)
	.then(function() {
		let server = httpServer.listen(argv[1], function () {
		let host = server.address().address,
			port = server.address().port;

		logger.log(0,' Server is listening at http://' + host + ':' + port, "internal");
		});
	})
	.catch(function(err) {
		console.error('Error occurred creating database connection pool', err);
		console.log('Exiting process');
		process.exit(0);
    }
);

process.on('uncaughtException', function(err) {
    console.error('Uncaught exception ', err);
    shutdown();
});

process.on('SIGTERM', function () {
    console.log('Received SIGTERM');
    shutdown();
});

process.on('SIGINT', function () {
    console.log('Received SIGINT');

    shutdown();
});

process.on('beforeExit', function () {
    console.log('Received BeforeExit');
    dbConnection.terminatePool();
});


function shutdown() {
    console.log('Shutting down');
    console.log('Closing MyAssistant backend server');

    httpServer.close(function () {
        console.log('Web server closed');

        dbConnection.terminatePool()
            .then(function() {
                console.log('Connection pool terminated');
                console.log('Exiting process');
                process.exit(0);
            })
            .catch(function(err) {
                console.error('Error occurred while terminating Server connection pool', err);
                console.log('Exiting process');
                process.exit(0);
            });
    });

    for (key in openHttpConnections) {
        openHttpConnections[key].destroy();
    }
}
