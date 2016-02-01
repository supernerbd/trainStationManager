/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery'], function($) {
   
   //vars
   var canvas;
   var ctx;
   var timeslotWidth;
   var drawObj;
   
   //constants
    var CANVAS = Object.seal({
        HEIGHT: 0,
        WIDTH: 0 
    });
    
    var DRAW = Object.freeze({
        TIMESLOTS: 30,
        TRACKHEIGHT: 50
    });
    //functions
    function init(){
        //canvas
        CANVAS.HEIGHT = $("canvas").innerHeight();
        CANVAS.WIDTH = $("canvas").innerWidth();
        canvas = document.querySelector('canvas');
	canvas.width = CANVAS.WIDTH;
	canvas.height = CANVAS.HEIGHT;
	ctx = canvas.getContext('2d');
        ctx.fillStyle="white";
        ctx.fillRect(0,0,CANVAS.WIDTH,CANVAS.HEIGHT);
        //drawing
        timeslotWidth = Math.floor(CANVAS.WIDTH/DRAW.TIMESLOTS);
        
        //start animation
        animation();
    };
    
    function animation(){
        ctx.fillStyle="white";
        ctx.fillRect(0,0,CANVAS.WIDTH,CANVAS.HEIGHT);
        //draw tracks
        drawTracks();
        //draw incoming trains
        drawTable();
        //draw timeline
        drawTimeline();
        window.requestAnimationFrame(animation);
    };
    
    function drawTimeline(){
        ctx.strokeStyle = "black";
        ctx.fillStyle="black";
        for(var i=1; i<=DRAW.TIMESLOTS; i++){
            var x = timeslotWidth*i;
            //vertical lines
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,50);
            ctx.stroke();
        }
         //write text
        for(var i=0; i<DRAW.TIMESLOTS; i++){
            var x = timeslotWidth*i;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "25px sansserif"; //font size on screen size
            if(i<2){
                if(game.gameState.time<5){
                    ctx.fillText("00:00",x+timeslotWidth/2,25);
                }
                else{
                    if(i===1){
                        ctx.fillText(ui.displayTime(game.gameState.time-1),x+timeslotWidth/2,25);
                    }
                    else{
                        ctx.fillText(ui.displayTime(game.gameState.time-2),x+timeslotWidth/2,25);
                    }
                }
            }
            else{
                if(i===2){
                    ctx.fillText(ui.displayTime(game.gameState.time),x+timeslotWidth/2,25);
                }
                else{
                    if(game.gameState.time+(i-2)>380){
                        ctx.fillText("00:00",x+timeslotWidth/2,25);
                    }
                    else{
                        ctx.fillText(ui.displayTime(game.gameState.time+(i-2)),x+timeslotWidth/2,25);
                    }
                }
            }
        }
        //horizontal line
        ctx.beginPath();
        ctx.moveTo(0,50);
        ctx.lineTo(CANVAS.WIDTH,50);
        ctx.stroke();
        //time now lines
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(timeslotWidth*2,0);
        ctx.lineTo(timeslotWidth*2,CANVAS.HEIGHT);
        ctx.stroke();
         ctx.beginPath();
        ctx.moveTo(timeslotWidth*3,0);
        ctx.lineTo(timeslotWidth*3,CANVAS.HEIGHT);
        ctx.stroke();
    };
    
    function createTable(){
        var events = [];
        var before = game.gameState.time -2;
        var now = game.gameState.time;
        var after = game.gameState.time + (DRAW.TIMESLOTS-3);
        $.each(game.gameState.events, function(i,event){
            if(event.time<=after && event.time>=before){
                event.x = (timeslotWidth)+((event.time-now)*timeslotWidth);
                event.y = 50+(DRAW.TRACKHEIGHT*event.track); //track+...
                events[events.length]=event;
            }
        });
        game.gameState.table = events;
    };
    /*this.contract=contract;
       this.level=level;
       this.trainName=trainName;
       this.lineNo=lineNo;
       this.track=track;
       this.time=time;
       this.fee=fee;
       this.reward=reward;
       this.id=id;
       */
    function drawTable(){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "hanging";
        ctx.font = "18px sansserif"; //font size on screen size
        $.each(game.gameState.table, function(i,event){
            ctx.save();
            ctx.fillRect(event.x,event.y,timeslotWidth,DRAW.TRACKHEIGHT);
            ctx.strokeRect(event.x,event.y,timeslotWidth,DRAW.TRACKHEIGHT);
            ctx.fillStyle = "black";
            ctx.fillText(event.trainName,event.x+timeslotWidth/2,event.y+2);
            ctx.fillText(event.lineNo,event.x+timeslotWidth/2,event.y+25);
            ctx.restore();
        });
    };
    
    function drawTracks(){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "grey";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px sansserif"; //font size on screen size
        var x = timeslotWidth;
        $.each(game.gameState.tracks, function(i,track){
            if(track.id===0){
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0,100);
                ctx.lineTo(CANVAS.WIDTH,100);
                ctx.stroke();
                
                ctx.fillStyle="black";
                ctx.fillText("Not scheduled",x,75);
                ctx.restore();
            }
            else{
                //vertical lines
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0,50+DRAW.TRACKHEIGHT*(i+1));
                ctx.lineTo(CANVAS.WIDTH,50+DRAW.TRACKHEIGHT*(i+1));
                ctx.stroke();
                //rects
                if(i%2!==0){
                    ctx.fillRect(0,DRAW.TRACKHEIGHT*(i+1),CANVAS.WIDTH,50);
                }
                //text
                ctx.fillStyle="black";
                ctx.fillText("Track: "+i,x,75+DRAW.TRACKHEIGHT*(i));
                ctx.restore();
            }
        });
    };
    
    return{
      init: init,  
      createTable: createTable
    };
});