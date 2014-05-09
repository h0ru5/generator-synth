'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var SynthGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
		//TODO install modules
		//this.installDependencies();
		this.log(chalk.green('Don\'t forget to run npm install in the back dir or simply run synth install -f -b'));
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

   
    this.log(chalk.magenta('So let\'s scaffold a syth app for you'));

    var prompts = [{
	  name : 'appName',
      message: 'What is the name of your app?'     
	},{ 
	  type: 'confirm',
      name: 'tweetExample',
      message: 'Would you like to have the tweets example code?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.tweetExample = props.tweetExample;
      this.appName = props.appName;
		
		
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('back');
	this.mkdir('back/resources');
    this.copy('back/back-app.js','back/back-app.js');
	  
	this.mkdir('front');
	this.mkdir('front/html');
	this.mkdir('front/css');
	this.mkdir('front/cjs/controllers');
	  
	this.copy('front/index.jade','front/index.jade');
	this.directory('front/misc');
	this.directory('front/images');
	
	//TODO copy tweets sample
	if(this.tweetExample) {
	  this.directory('back/resources/tweets');
      this.directory('front/css');
	  this.directory('front/js');
      this.directory('front/html/tweets');
	}
	 
    this.template('back/_package.json', 'back/package.json');
    this.template('front/_bower.json', 'front/bower.json');
	this.template('_synth.json','synth.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SynthGenerator;