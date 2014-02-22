"use strict";

var http = require('http');
var path = require('path');

exports.index = function(req,res){
  res.render("index");
}

exports.api = function(req, res){
  res.send("test api!", 200);
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};
