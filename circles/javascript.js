// set up angle variables
var thetaL2 = 0.65;
var thetaL3 = 1.7;
var thetaL4 = 0.5;

// use step button to update position variables
document.getElementById("step").addEventListener("click", function(){
    
    // increment the angles
    thetaL2 = thetaL2 + 0.35;
    let tThetaL2 = thetaL2.toString();
    thetaL3 = thetaL3 + 0.4;
    let tThetaL3 = thetaL3.toString();
    thetaL4 = thetaL4 + 0.25;
    let tThetaL4 = thetaL4.toString();
    
    // calculate the x and y coordinates and convert to text
    xPosL2 = Math.cos(thetaL2) * 110 + 110;
    let txPosL2 = xPosL2.toString() + "px";
    yPosL2 = Math.sin(thetaL2) * 110 + 110;
    let tyPosL2 = yPosL2.toString() + "px";
    xPosL3 = Math.cos(thetaL3) * 40 + 40;
    let txPosL3 = xPosL3.toString() + "px";
    yPosL3 = Math.sin(thetaL3) * 40 + 40;
    let tyPosL3 = yPosL3.toString() + "px";
    xPosL4 = Math.cos(thetaL4) * 30 + 30;
    let txPosL4 = xPosL4.toString() + "px";
    yPosL4 = Math.sin(thetaL4) * 30 + 30;
    let tyPosL4 = yPosL4.toString() + "px";

    // send x and y coordinates to the browser
    document.getElementById("layer-2").style.top = tyPosL2;
    document.getElementById("layer-2").style.left = txPosL2;
    document.getElementById("layer-3").style.top = tyPosL3;
    document.getElementById("layer-3").style.left = txPosL3;
    document.getElementById("layer-4").style.top = tyPosL4;
    document.getElementById("layer-4").style.left = txPosL4;

});      
