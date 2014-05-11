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
		
		this.log(chalk.green('\nDon\'t forget to run ') + chalk.yellow('npm install') + chalk.green(' in the back dir'));
		this.log(chalk.green('And ') +chalk.yellow('bower install') +  chalk.green(' in the front dir'));
		this.log(chalk.green('Or install synth globally and simply run ') + chalk.yellow('synth install -f -b') + chalk.green(' from the root dir'));
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
      message: 'Would you like to have the example code?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.tweetExample = props.tweetExample;
      this.appName = props.appName;
		
      done();
    }.bind(this));
  },

  app: function () {
    this.directory('back');
	this.directory('front');
		
	if(this.tweetExample) {
	  this.directory('example/front','front');
	  this.directory('example/back','back');
	}
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
	
	this.template('_package.json', 'back/package.json');
    this.template('_bower.json', 'front/bower.json');
	this.template('_synth.json','synth.json');
  }
});

module.exports = SynthGenerator;