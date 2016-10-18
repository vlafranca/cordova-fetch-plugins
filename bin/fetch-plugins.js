#!/usr/bin/env node
'use strict';

var fs = require("fs");
var shell = require("shelljs");

try {
	var fetch = fs.readFileSync('plugins/fetch.json');

	var plugins = JSON.parse(fetch);

	for (var plugin in plugins) {
	    var cordovaCmd = "cordova plugin add "+plugins[plugin].source.id;
	    var variables = plugins[plugin].variables;
	    if(Object.keys(variables).length > 0){
	        for (var v in variables){
	            cordovaCmd += " --variable "+v+"=\""+variables[v]+"\"";
	        }
	    }
	    console.log("Executing command : "+cordovaCmd);
	    shell.exec(cordovaCmd);
	}
}catch(err){
	if (err.code === 'ENOENT') {
	  console.log('Fetch.json file not found. Be sure to be at the root of your cordova project and plugins/fetch.json exist.');
	} else {
	  throw err;
	}
}
