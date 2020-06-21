'use strict';
//requires the fs package
var fs        = require('fs');
//requires the path package
var path      = require('path');
//requires the sequelize package
var Sequelize = require('sequelize');
// a way of defining files so that it only returns the end name of a path (/user/module.js to module.js)
var basename  = path.basename(module.filename);

var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
//reads the file currently being worked on
  .readdirSync(__dirname)
  filters 
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
