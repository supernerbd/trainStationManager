/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery'], function($) {
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }
    
    function load(){
       game.gameState = localStorage.getObj("save");
       contracts.showContractsOffert();
       contracts.showContractsTaken();
    }
    
    function save(){
        localStorage.setObj("save", game.gameState);
    }
    
    return{
        load: load,
        save: save
    };
});