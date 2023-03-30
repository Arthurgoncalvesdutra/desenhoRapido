var canvas;
var synth;
var classifier; 
function setup(){
canvas=createCanvas(280, 280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth=window.speechSynthesis; 
}
function limpar_canvas(){
    background("white");
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error)
    {
        console.error(error);
    }
    var result=results[0].label;
    document.getElementById("label").innerHTML="nome: "+result.replace("_", " ");
    document.getElementById("confidence").innerHTML="precisão: "+Math.round(results[0].confidence*100)+"%";
    var utterThis=new SpeechSynthesisUtterance(result.replace("_", " "));
    synth.speak(utterThis);
}