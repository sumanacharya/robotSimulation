export class MainBoard {
  constructor(element) {
    this.init(element);
    this.addEventListeners();
  }

  init(element) {
    this.element = element;

    // Element selectors
    this.elMainGrid = this.element.querySelector(".mainBoard__grid");
    this.elGridItem = this.element.querySelectorAll(".mainBoard__grid .item");
    this.elCreature = this.element.querySelector(".creature");
    this.elCreatureArrow = this.element.querySelector(".creature span");
    this.elDownKey = this.element.querySelector("#downKey");
    this.elUpKey = this.element.querySelector("#upKey");
    this.elLeftKey = this.element.querySelector("#leftKey");
    this.elRightKey = this.element.querySelector("#rightKey");

    //grid dimension
    this.grid = {
      width: this.elMainGrid.clientWidth,
      height: this.elMainGrid.clientHeight,
      cellWidth: this.elGridItem[0].clientWidth + 1, // take first cell and find width with border
      cellHeight: this.elGridItem[0].clientHeight + 1,
    };

    this.degree = 0; // starting position  in degrees, Default: facing right

    this.position = {
      x: 0,
      y: 0,
      xDir: 1, // Default: Positive direction in X
      yDir: 1, // Default: Positive direction in Y
      xBoundray: this.grid.width - this.grid.cellWidth, // End point of the board width
      yBoundray: this.grid.height - this.grid.cellHeight, // End point of the board Height
    };
    console.log("position", this.position);
  }

  addEventListeners() {
    // Register keyboard keyPress event
    window.onkeydown = this.handleKeyPress.bind(this);

    // OnScreen button click 
    if (this.elDownKey) {
      this.elDownKey.onclick = this.handleDownInteraction.bind(this);
    }

    if (this.elUpKey) {
      this.elUpKey.onclick = this.handleUpInteraction.bind(this);
    }

    if (this.elLeftKey) {
      this.elLeftKey.onclick = this.handleLeftInteraction.bind(this);
    }

    if (this.elRightKey) {
      this.elRightKey.onclick = this.handleRightInteraction.bind(this);
    }
  }

  handleDirection(deg) { // Rotate  to face any cardinal direction
    this.elCreature.style.transform = `rotate(${deg}deg)`;
    console.log("Creature has turned", deg);
  }

  handleMovement(xDir, yDir) { // Move  along the board base on its initial position
    this.position.x = this.position.x + xDir * this.grid.cellWidth;
    this.position.y = this.position.y + yDir * this.grid.cellHeight;
    this.elCreature.style.top = `${this.position.y}px`;
    this.elCreature.style.left = `${this.position.x}px`;
  }

  handleDownInteraction() { // condition when facing downward
    if (this.degree === 90) { // first rotate the face in correct direction before moving forward
      if (this.position.y >= this.position.yBoundray) return; // if it reaches bottom of the board
      this.position.xDir = 0;
      this.position.yDir = 1;
      this.handleMovement(this.position.xDir, this.position.yDir);
    }
    this.degree = 90;
    this.handleDirection(this.degree);
  }

  handleUpInteraction() { // condition when facing Upward
    if (this.degree === -90) {
      if (this.position.y <= 0) return; // if it's at the top the board
      this.position.xDir = 0;
      this.position.yDir = -1;
      this.handleMovement(this.position.xDir, this.position.yDir);
    }
    this.degree = -90;
    this.handleDirection(this.degree);
  }

  handleLeftInteraction() { // condition when facing Left
    if (this.degree === -180) {
      if (this.position.x <= 0) return; // if it's at the far left of the board
      this.position.xDir = -1;
      this.position.yDir = 0;
      this.handleMovement(this.position.xDir, this.position.yDir);
    }
    this.degree = -180;
    this.handleDirection(this.degree);
  }

  handleRightInteraction() { // condition when is facing right
    if (this.degree === 0) {
      if (this.position.x >= this.position.xBoundray) return;
      this.position.xDir = 1;
      this.position.yDir = 0;
      this.handleMovement(this.position.xDir, this.position.yDir);
    }
    this.degree = 0;
    this.handleDirection(this.degree);
  }

  handleKeyPress(event) { // handle keyboard input
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        this.handleDownInteraction();
        break;
      case "Up":
      case "ArrowUp":
        this.handleUpInteraction();
        break;
      case "Left":
      case "ArrowLeft":
        this.handleLeftInteraction();
        break;
      case "Right":
      case "ArrowRight":
        this.handleRightInteraction();
        break;
      default:
        return;
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
}
