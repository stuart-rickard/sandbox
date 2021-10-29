// set up position variables and print them out
var xPosL2 = 150;
let txPosL2 = xPosL2.toString() + "px";
var yPosL2 = 75;
let tyPosL2 = yPosL2.toString() + "px";
var xPosL3 = 150;
let txPosL3 = xPosL3.toString() + "px";
var yPosL3 = 75;
let tyPosL3 = yPosL3.toString() + "px";
var thetaL2 = 0;
let tThetaL2 = thetaL2.toString();
var thetaL3 = 0;
let tThetaL3 = thetaL3.toString();
document.getElementById("demo").innerHTML = "L2 x value is " + txPosL2 + 
    " L2 y value is " + tyPosL2 +  
    " L3 x value is " + txPosL3 + 
    " L3 y value is " + tyPosL3 +
    " L2 angle is " + tThetaL2 +
    " L3 angle is " + tThetaL3;

// use step button to update position variables
// need to fix calculation to take account of the thicknes of the border
document.getElementById("step").addEventListener("click", function(){
    thetaL2 = thetaL2 + 0.3;
    let tThetaL2 = thetaL2.toString();
    thetaL3 = thetaL3 + 0.25;
    let tThetaL3 = thetaL3.toString();
    xPosL2 = Math.cos(thetaL2) * 75 + 75;
    let txPosL2 = xPosL2.toString() + "px";
    yPosL2 = Math.sin(thetaL2) * 75 + 75;
    let tyPosL2 = yPosL2.toString() + "px";
    xPosL3 = Math.cos(thetaL3) * 75 + 75;
    let txPosL3 = xPosL3.toString() + "px";
    yPosL3 = Math.sin(thetaL3) * 75 + 75;
    let tyPosL3 = yPosL3.toString() + "px";
    document.getElementById("layer-3").style.top = tyPosL3;
    document.getElementById("layer-3").style.left = txPosL3;
    document.getElementById("layer-2").style.top = tyPosL2;
    document.getElementById("layer-2").style.left = txPosL2;
    document.getElementById("demo").innerHTML = "L2 x value is " + txPosL2 + 
        " L2 y value is " + tyPosL2 +  
        " L3 x value is " + txPosL3 + 
        " L3 y value is " + tyPosL3 +
        " L2 angle is " + tThetaL2 +
        " L3 angle is " + tThetaL3;

});      
