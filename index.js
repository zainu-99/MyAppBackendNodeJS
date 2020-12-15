var express = require('express');
var web = require('./app');
var api = require('./api-rest');
require('dotenv').config()

var route = express();
//route.use(web);
route.use(api);

route.listen(process.env.PORT,function(){console.log("Server Ready")});





