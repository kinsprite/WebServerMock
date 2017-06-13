var connect = require('connect');

// var compression = require('compression');
var bodyParser = require('body-parser');
var Rest = require('connect-rest');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');

const mockApi = require('./conf/mock-api.conf');
const rest = require('./conf/rest-api.conf');
require('./mocks/rest.api/');

var app = connect()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(rest.processRequest())
  .use(mockApi.route, mockApi.handle)
  .use(function (req, res, next) {
      if (!res.finished) {
        next();
      }
  })
  .use(serveStatic('dist'))
  .use(serveIndex('dist'))
  .listen(3000)
;
