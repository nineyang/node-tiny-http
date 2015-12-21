// Generated by CoffeeScript 1.10.0
(function() {
  var Http, Result, Router, Url;

  Http = require('http');

  Url = require('url');

  Result = require('./result');

  Router = require('./router');

  module.exports = {
    start: function(port, host) {
      var http;
      if (port == null) {
        port = 80;
      }
      if (host == null) {
        host = 'localhost';
      }
      http = Http.createServer(Router.handler(Result.results));
      return http.listen(port, host);
    },
    rule: Router.registerRule,
    result: Result.register,
    on: function(pattern, fn, method) {
      if (method == null) {
        method = null;
      }
      return Router.register(method, pattern, fn);
    },
    get: function(pattern, fn) {
      return Router.register('get', pattern, fn);
    },
    post: function(pattern, fn) {
      return Router.register('post', pattern, fn);
    },
    assets: function(path, dir) {
      return Router.register('get', (path.replace(/\/+$/g, '')) + '/%path', function(params) {
        return this.file(dir + '/' + (params.path.replace(/\.{2,}/g, '')));
      });
    }
  };

}).call(this);
