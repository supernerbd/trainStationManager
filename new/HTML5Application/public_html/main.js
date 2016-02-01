/*
 * Copyright (c) 2016 Niklas Olmes <niklas@olmes.de>, Bernd Paulus <bpaulus@posteo.de>
 */

'use strict';

define(function(require) {
    window.setup = require('setup');
    window.ui = require('ui');
    window.draw = require('draw');
    window.game = require('game');
    window.contracts = require('contracts');
    window.upgrades = require('upgrades');
    setup.setup();
/*	window.game = require('game');
	window.controls = require('controls');
	window.ui = require('ui');
	window.hud = require('hud');
	window.physics = require('physics');
	window.draw = require('draw');
	window.dice = require('dice');
	window.highscore = require('highscore');
	window.colorpicker = require('colorpicker');

	game.setup();*/
});
