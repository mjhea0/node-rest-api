"use strict";

exports.index = function(req,res){
  res.render("index");
}

exports.api = function(req, res){
  res.send("test api!", 200);
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.angular = function(req, res){
  res.render("angular");
};

exports.test = function(req, res){
  res.render("test");
};
