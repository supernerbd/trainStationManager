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
   //view is for scrolling. But at the moment scrolling is not possible because 
   //events have sealed x and y values. Instead we cap the Track number at 10 tracks.
   //we need 600px height at least for the canvas
  /* var view = Object.seal({
       currentTop: 0,
       currentBottom: 0,
       viewableTracks: 0
   });*/
   
   //constants
    var CANVAS = Object.seal({
        HEIGHT: 0,
        WIDTH: 0 
    });
    
    var DRAW = Object.seal({
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
		//ctx.font = "25px 'Kurale' serif";
        //drawing
        timeslotWidth = Math.floor(CANVAS.WIDTH/DRAW.TIMESLOTS);
        
        if(timeslotWidth < 60){
            DRAW.TIMESLOTS = 20;
            timeslotWidth = Math.floor(CANVAS.WIDTH/DRAW.TIMESLOTS);
            if(timeslotWidth < 60){
                DRAW.TIMESLOTS = 13;
                timeslotWidth = Math.floor(CANVAS.WIDTH/DRAW.TIMESLOTS);
            }
        }
        
    /*    view.viewableTracks = Math.floor(CANVAS.HEIGHT/DRAW.TRACKHEIGHT)-1;
        view.currentBottom = view.viewableTracks;
        console.log(view);*/
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
            ctx.font = "22px Kurale"; //font size on screen size
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
                //outside delays
                if(!event.outsideDelay){
                    event.outsideDelay = game.createOutsideDelay(event.trainName);
                    event.time+=parseInt(event.outsideDelay,10);
                    if(game.delayCollision(event.track, event.time, event.id)){
                        event.track=0;
                    }
                }
                //draw
                event.x = (timeslotWidth)+((event.time-now)*timeslotWidth);
                event.y = 50+(DRAW.TRACKHEIGHT*event.track); //track+...
                event.height = DRAW.TRACKHEIGHT;
                event.width = timeslotWidth;
                events[events.length]=event;
            }
        });
        game.gameState.table = events;
    };
    
    function drawTable(){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.textBaseline = "hanging";
       ctx.font = "18px Kurale"; //font size on screen size
       $.each(game.gameState.table, function(i,event){
            ctx.save();
            ctx.fillStyle = "rgba(0, 128, 0, .5)";
            if(event.outsideDelay!=="0"){
                ctx.fillStyle="rgba(255, 165, 0, .5)";
            }
            if(event.delay!==0){
                ctx.fillStyle="rgba(255, 0, 0, .5)";
            }
            ctx.fillRect(event.x-timeslotWidth,event.y,timeslotWidth,DRAW.TRACKHEIGHT);
            ctx.fillRect(event.x+timeslotWidth,event.y,timeslotWidth,DRAW.TRACKHEIGHT);
            ctx.restore();
       });
       
        $.each(game.gameState.table, function(i,event){
           // if(track.id>=view.currentTop && track.id<=view.currentBottom){
                ctx.save();
                if(event.outsideDelay!=="0"){
                    ctx.fillStyle="orange";
                }
                if(event.delay!==0){
                    ctx.fillStyle="red";
                }
                ctx.fillRect(event.x,event.y,timeslotWidth,DRAW.TRACKHEIGHT);
                ctx.strokeRect(event.x,event.y,timeslotWidth,DRAW.TRACKHEIGHT);             
                ctx.fillStyle = "black";
                ctx.fillText(event.trainName,event.x+timeslotWidth/2,event.y+2);
                ctx.fillText(event.lineNo,event.x+timeslotWidth/2,event.y+25);
                ctx.restore();
            //}
        });
    };
    
    function drawTracks(){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "grey";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Kurale"; //font size on screen size
        var x = timeslotWidth;
        $.each(game.gameState.tracks, function(i,track){
           // if(track.id>=view.currentTop && track.id<=view.currentBottom){
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
           // }
        });
    };
    
    return{
      init: init,  
      createTable: createTable
    };
});