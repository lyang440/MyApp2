var logger = require('koa-logger');
var router = require('koa-router');
// var parse = require('co-body');
var koa = require('koa');
var app = koa();

app.use(logger());

var api = router();

var param = require('./param.json');

var APP_INFO = {
  "code": 200,
  "data": {
    "title": "good",
    "appUri": "wangkechun.good",
    "specUri": "qcos-vendor.percona-cluster",
    "specVer": 1,
    "status": 2,
    "exports": {
      "good.mysql-admin": {
        "address": "172.16.8.12",
        "proto": 6
      },
      "good.perconahaproxy": {
        "address": "10.0.186.109",
        "proto": 6
      }
    },
    "parentUri": "",
    "vendorUri": ""
  }
};

var NODE_INFO = {
  code:200,
  data:{
    'percona-cluster-1':{
      status:'normal'
    },
    'percona-cluster-2':{
      status:'normal'
    },
    'percona-cluster-3':{
      status:'normal'
    }
  }
};

var PARAMS_INFO = {
  code:200,
  data:{
    params:param.data.Parameters.settingParams
  }
}
api.get('/v1/app/info', function*(){
  this.body = APP_INFO;
});
api.get('/v1/node/info', function*(){
  this.body = NODE_INFO;
});
api.get('/v1/params/info', function*(){
  this.body = PARAMS_INFO;
});


app.use(api.routes()).use(api.allowedMethods());
app.listen(5000);
console.log('listening on port 8000');

