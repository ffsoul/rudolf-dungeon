class Box {
  constructor(options) {
    this.x = options.x ? options.x : 0;
    this.y = options.y ? options.y : 0;
    colorMode(HSL, 100);
    this.color =  color(random(0, 100), 70, 70);
    this.width = options.width ? options.width : 100;
    this.height = options.height ? options.height : 100;
    this.naru = options.naru;
    this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, {
      isStatic: options.isStatic,
      restitution: 1.1,
    });
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    World.add(world, this.body);
  }

  show() {
    var randoHodo = random(naruArray);

    var pos = this.body.position;
    var angle = this.body.angle;
    ellipse(CENTER);

    push();
    
    imageMode(CENTER);
    noStroke();
    translate(pos.x, pos.y);
    rotate(angle);
    circle(0, 0, 2*this.w);

    if (this.naru) {
      image(this.naru, 0, 0, this.width, this.height);
    }
    pop();
  }

  push() {
    Body.applyForce(this.body, this.body.position, {
      x: random(-1, 1) * 0.015,
      y: random(-1, 1) * 0.015,
    });
    Body.setAngularVelocity(this.body, 0.1);

  }

  checkEdge() {
    return this.body.position.y > height + this.w;
  }

  // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }

}
