/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery', 'ui', 'game', 'draw', 'upgrades', 'contracts'], function($) {
   
    function setup(){
       ui.init();
       game.initGameState();
       upgrades.init();
       contracts.init();
       draw.init();
   }
   
   return{
       setup: setup
   };
});