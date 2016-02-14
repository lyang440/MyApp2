var logger = require('koa-logger');
var router = require('koa-router');
// var parse = require('co-body');
var koa = require('koa');
var app = koa();

app.use(logger());

var api = router();

api.get('/app/info', function*(){
  this.body = {
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
});


app.use(api.routes()).use(api.allowedMethods());
app.listen(5000);
console.log('listening on port 8000');

