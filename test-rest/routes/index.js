"use strict";

exports.api = function(req, res){
  res.send("test api!", 200);
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

