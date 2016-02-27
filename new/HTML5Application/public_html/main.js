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
});
