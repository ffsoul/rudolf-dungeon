var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;
  Vector = Matter.Vector;
Body = Matter.Body;

var engine;
var world;
var button;
var song;

var colors = chroma.scale(["yellow", "red", "blue", "red", "yellow"]);

// test
var lyric = {
  x: 0,
  y: 100,
  text:""
};

var naruArray = [];

var isPartyMode = false;

var boxes = [];
var numBoxes = 20;

function preload() {
  naruhodo = loadImage(
    "assets/rudolphChibi1"
  );

  hodonaru = loadImage(
    "assets/rudolphChibi2"
  );
  // naruhodo = loadImage(
  //   "https://static.wikia.nocookie.net/umamusume/images/6/6c/SymboliRudolfChibi1.png/revision/latest/scale-to-width-down/250?cb=20220502233132"
  // );

  // hodonaru = loadImage(
  //   "https://static.wikia.nocookie.net/umamusume/images/d/d7/SymboliRudolfChibi2.png/revision/latest/scale-to-width-down/250?cb=20220502233144"
  // );

naruArray = [
  naruhodo,
  hodonaru,
];


getAudioContext().suspend();
soundFormats("mp3", "ogg");

song = loadSound(
  "assets/umapyoi.mp3"
);

}

function setup() {
  createCanvas(windowWidth, windowHeight);


  engine = Engine.create();
  // engine.gravity.y = 0;
  world = engine.world;

  for (let i = 0; i < numBoxes; i++) {
    boxes[i] = new Box({
      x: random(width),
      y: random(height),
      width: 80,
      height: 80,
      naru: naruArray[Math.floor(random(naruArray.length))],
    });
  }

  button = {
    radius: 20,
    position: {
      x: width / 2,
      y: height / 2,
    },
    text: "activate naruhodo mode",
    text2: "deactivate naruhodo mode",
  };

  wallBtm = new Box({
    x: width / 2,
    y: height - 5,
    width: width+100,
    height: 10,
    isStatic: true,
  });

  // wallTop = new Box({
  //   x: width / 2,
  //   y: 5,
  //   width: width+100,
  //   height: 10,
  //   isStatic: true,
  // });

  // wallL = new Box({
  //   x: 5,
  //   y: height / 2,
  //   width: 10,
  //   height: height+100,
  //   isStatic: true,
  // });

  // wallR = new Box({
  //   x: width - 5,
  //   y: height / 2,
  //   width: 10,
  //   height: height+100,
  //   isStatic: true,
  // });

  Engine.run(engine);

  console.log(boxes);
  
  lyric.x = width / 2;
  
  //test
  // change to the appropriate lyric
//   song.addCue(8, changeText, "Honestly, could it be?");
//   song.addCue(11, changeText, "We fought hard but nothing mattered");
//   song.addCue(15, changeText, "Memories chasing me");
//   song.addCue(18, changeText, "I got far, but thoughts run faster");
  
//   song.addCue(21, changeText, "Oh, and if I turned back time");
//   song.addCue(25, changeText, "We'd kiss and laugh until we cried");
//   song.addCue(28, changeText, "I'd look at you and I'd know it");
//   song.addCue(32, changeText, "It feels so good can't control it");
  
//   song.addCue(35, changeText, "Oh and if we had all night");
//   song.addCue(38, changeText, "We'd cross our hearts until we died");
//   song.addCue(43, changeText, "I'd look at you and I'd know it");
//   song.addCue(46, changeText, "It feels so good can't control it");
  
//   song.addCue(49, changeText, "These pieces in my brain");
//   song.addCue(52, changeText, "Reflections etched in blame");
//   song.addCue(55, changeText, "Oh no, it's okay");
//   song.addCue(59, changeText, "All along we had good intentions");

//   song.addCue(62, changeText, "These pieces in my brain");
  
//   song.addCue(64, changeText, "");
  
}

//test
function changeText(val){
  lyric.text = val;
  lyric.y = random(height-20)
}

function mouseDragged() {
  boxes.push(new Box(mouseX, mouseY, 10, 10));
}

function draw() {
  background(0);

Engine.update(engine);
for (let i = boxes.length-1; i >= 0; i--) {
  boxes[i].show();
  // Remove the Body from the world and the array
  if (boxes[i].checkEdge()) {
    boxes[i].removeBody();
    boxes.splice(i, 1);
  }
}

  var randoHodo = random(naruArray);
  var c = colors((frameCount % 1000) / 1000).rgb(); // will run from 0 - 1 in increments of 1000

  image(naruhodo, random(-3, 3), random(-3, 3), width, height);

  if (isPartyMode) {
    background(c[0], c[1], c[2]);
    image(hodonaru, random(-3, 3), random(-3, 3), width, height);
  }

  for (var i = 0; i < boxes.length; i++)
    {
        boxes[i].show();
    }  

  for (let i = 0; i < numBoxes; i++) {
    boxes[i].show();
  }

  //push around my boxes only if the song is playing
  if (isPartyMode) {
    for (var i = 0; i < numBoxes; i++) {
      boxes[i].show();

      //only push them every 60 frames
      if (frameCount % 25 == 0) {
        boxes[i].push();
        for ( let b of boxes) {
          b.push();
        }
      }
    }
  }

  // wallBtm.show();
  // wallTop.show();
  // wallL.show();
  // wallR.show();

  textAlign(CENTER);
  fill("white");
  if (!isPartyMode) {
    circle(button.position.x, button.position.y, button.radius);
    fill("black");
    text(button.text, button.position.x, button.position.y + 40);
  } else {
    circle(button.position.x, button.position.y, button.radius*1.5);
    fill("black");
    text(button.text2, button.position.x, button.position.y + 40);
    	// draw the lyric
	text(lyric.text, width/2, height/2);
  }
}

function mousePressed() {



  if (
    dist(mouseX, mouseY, button.position.x, button.position.y) < button.radius
  ) {
    userStartAudio();

    isPartyMode = !isPartyMode;
    

    
 
    if (isPartyMode) {
      engine.gravity.y = 1;
      song.loop(0, 1);


    } else {
      engine.gravity.y = 0;
      song.pause(0, 1);

    }
  }
  
        for (let i = 0; i < numBoxes; i++) {
      boxes[i].push();
    }

for ( let b of boxes) {
  b.push();
}

}



function mouseDragged(){
  let b = new Box({
    x: mouseX,
    y: mouseY,
    width: 80,
    height: 80,
    naru: naruArray[Math.floor(random(naruArray.length))],
  });
  boxes.push(b);
}



// magnet mode
// function mouseDragged(){
//   for (let i = 0; i < numBoxes; i++) {

//     boxes[i] = new Box({
//     x: mouseX,
//     y: mouseY,
//     width: 80,
//     height: 80,
//     naru: naruArray[Math.floor(random(naruArray.length))],
//   });
//   boxes[i].push();
// }
// }


