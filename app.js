 var i;
    var canvas;
    var mypaddle;
    var mycolors=["Purple","DodgerBlue","Maroon","Red","Navy","black"];
    var changecolor=false;
    var canvasContext;
    var ballX=100;
    var ballY=100;
    var ballspeedX= 8;
    var ballspeedY= 8;
    var paddle1Y=250;
    var paddle2Y=250;
    const paddleHeight=110;
    const thickness=14;

    var p1score=0;
var p2score=0;
var winningScore=prompt('PLease Enter a Winning Score!');
var showingWinScreen=false;

   window.onload=function(){
        //   winningScore=prompt('enter winnig score!');
          console.log("hello world");
          canvas=document.getElementById("gameCanvas");
          canvasContext=canvas.getContext('2d');
          canvasContext.fillStyle="darkseagreen";
          canvasContext.fillRect(0,0,canvas.width,canvas.height);
          var fps=50;
          setInterval(function(){
              drawEverything();
              moveEverything();
              
          },1000/fps);
          canvas.addEventListener('mousedown',mouseClick);
          canvas.addEventListener('touchstart',mouseClick);
          canvas.addEventListener('mousemove',function(evt){ //............Using the calculated mouse position
                                    var mousePos = calculateMousePos(evt);
                                    paddle1Y=mousePos.y - (paddleHeight/2);

      });

      canvas.addEventListener('touchmove',function(evt){ //............Using the calculated mouse position
        var mousePos = calculateMousePos2(evt);
        paddle1Y=mousePos.y - (paddleHeight/2);

});
      // Register touchstart and touchend listeners for element 'source'
// var src = document.getElementById("gameCanvas");
// var clientX, clientY;

// src.addEventListener('touchstart', function(e) {
//   // Cache the client X/Y coordinates
//   clientX = e.touches[0].clientX;
//   clientY = e.touches[0].clientY;
// }, false);

// src.addEventListener('touchend', function(e) {
//   var deltaX, deltaY;

//   // Compute the change in X and Y coordinates. 
//   // The first touch point in the changedTouches
//   // list is the touch point that was just removed from the surface.
//   deltaX = e.changedTouches[0].clientX - clientX;
//   deltaY = e.changedTouches[0].clientY - clientY;
//   paddle1Y=deltaY - (paddleHeight/2);
//   // Process the data ... 
// }, false);

    
         

   }
   function calculateMousePos(evt){//............................Calculating mouse position.................................
          var rect = canvas.getBoundingClientRect();
          var root = document.documentElement;
          var mouseX=evt.clientX - rect.left - root.scrollLeft;
          var mouseY= evt.clientY - rect.top - root.scrollTop;
           return{
           x:mouseX,
           y:mouseY
     };

}

function calculateMousePos2(evt){//............................Calculating mouse position.................................
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX=evt.touches[0].clientX - rect.left - root.scrollLeft;
  var mouseY= evt.touches[0].clientY - rect.top - root.scrollTop;
   return{
   x:mouseX,
   y:mouseY
};

}

   function drawEverything(){
        //next lines blank out the screen with black
      colorRect(0,0,canvas.width,canvas.height,"darkseagreen");

      if(showingWinScreen){//................end screen niye ashlam.........
                 canvasContext.fillStyle='#483D8B';
                 canvasContext.font="30px Cursive";
                    if(p1score>=winningScore){
                      canvasContext.fillText("YOU WON!",canvas.width/2-80,canvas.height/2);
             }else if(p2score>=winningScore){

                      canvasContext.fillText("COMPUTER WON!",canvas.width/2-80,canvas.height/2);
              }
                canvasContext.fillText("CLICK TO CONTINUE",200,350);
              return;
          }
       
       
       drawnet()
       
       if(changecolor){
           
        // mypaddle= colorRect(0,paddle1Y,thickness,paddleHeight,mycolors[i]);
        colorCircle(ballX,ballY,10,mycolors[i]);
       }else{
        
        colorCircle(ballX,ballY,10,'orangered');
       }
       
       
       mypaddle= colorRect(0,paddle1Y,thickness,paddleHeight,'#483D8B');
       colorRect(canvas.width-thickness,paddle2Y,thickness,paddleHeight,'#483D8B');
       
       console.log(ballX);
       canvasContext.fillStyle='black';
       canvasContext.font="30px cursive";
       canvasContext.fillText(p1score,100,50);
       canvasContext.fillText(p2score,canvas.width-100,50);
       canvasContext.fillText("winningScore= "+winningScore,canvas.width/2-80,30);

   }
   function moveEverything(){
    if(showingWinScreen){//.......................movement ENDs  HERE................
       return;
}

    computerMovement();

         ballX+=ballspeedX;
         ballY+=ballspeedY;
         if(ballX<0+thickness){
                 if(ballY>paddle1Y && ballY<paddle1Y+paddleHeight){
                            ballspeedX=-ballspeedX;
                     var deltaY= ballY-(paddle1Y+paddleHeight/2);
                     ballspeedY+=deltaY*.09;
                     ballspeedX+=deltaY*.09;
                     changecolor=true;
                     i=random(0,5);


                            
                         
                  }else{ 
                 p2score++;//..................................!!MUST BE BEFORE BALL RESET!!
                ballReset();

                 
                       }
                               }
         if(ballX>canvas.width-thickness){
                if(ballY>paddle2Y && ballY<paddle2Y+paddleHeight){
                            ballspeedX=-ballspeedX;
                         var deltaY= ballY-(paddle2Y+paddleHeight/2);
                     ballspeedY+=deltaY*.09;
                     ballspeedX+=deltaY*.09;
                     changecolor=true;
                     i=random(0,5);
                  }else{
                 p1score++;
                 ballReset();
                 
                       }
                               }
       if(ballY<0 || ballY>canvas.height){
           ballspeedY=-ballspeedY;
       }
   }
   function colorRect(X,Y,width,height,color){
         this.x=X;
         this.y=Y;
         this.width=width;
         this.height=height;
         this.color=color;
         
          canvasContext.fillStyle=this.color;
          canvasContext.fillRect(this.x,this.y,this.width,this.height);
         
   }
   function colorCircle(X,Y,rad,color){
       canvasContext.fillStyle=color;
       canvasContext.beginPath();
       canvasContext.arc(X,Y,rad,0,2*Math.PI,true);
       canvasContext.fill();
   }
   function drawnet(){
         for(var i=0;i<canvas.height;i+=40){
              colorRect(canvas.width/2-1,i,2,20,'white');
                                           }
   }
   function computerMovement(){
                var paddle2YCentre=paddle2Y+(paddleHeight/2);
             if(paddle2YCentre<ballY-30){

                    paddle2Y+=15;

                    } else if(paddle2YCentre>ballY+30){
                     paddle2Y-=15;
                    }


}
function ballReset(){
              if(p1score>=winningScore || p2score>=winningScore){
              
            showingWinScreen=true;
            } 
            if(ballX<0+thickness){
                ballspeedX=7.5;
                ballspeedY=7.5;
            
            }
            if(ballX>canvas.width-thickness){
                ballspeedX=-7.5;
                ballspeedY=-7.5;
            
            }
             
             
             
             ballX=canvas.width/2;
             ballY=canvas.height/2;

}
function mouseClick(evt){//................to start again....

      if(showingWinScreen){
         p1score=0;
          p2score=0;
          ballX=canvas.width/2;
          ballY=canvas.height/2;
          ballspeedX= 8;
         ballspeedY= 8;
   showingWinScreen=false;
   
   }


}
function random(min,max){
    var result= Math.floor(Math.random()*(max-min+1)+min);
    console.log(result);
    return result;
}
