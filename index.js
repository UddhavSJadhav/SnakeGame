document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#main div");
  const scoreBoard = document.querySelector("span");
  const startBtn = document.querySelector(".start");
  const gamePad = document.querySelectorAll(".controller-body button");

  const width = 10;
  let currentIndex = 0; //first li in grid
  let appleIndex = 0; //apple li in grid
  let currentSnake = [2, 1, 0]; //li in grid being 2 is head and 0 is tail (with all 1's being body of the snake)
  let direction = 1; //1 li
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  //functions
  function startGame() {
    document.getElementById("menu").setAttribute("style", "display:none");
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreBoard.innerText = score;
    intervalTime = 800;
    currentSnake = [22, 21, 20];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(movesOutcomes, intervalTime);
  }

  function movesOutcomes() {
    //if snake hits wall or itself
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width < 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      document.getElementById("menu").setAttribute("style", "display:block");
      document.getElementById("game-over").innerText = "GAME OVER!";
      return clearInterval(interval);
    }

    const tail = currentSnake.pop(); //removes last item in an array
    squares[tail].classList.remove("snake"); //removes class of tail
    currentSnake.unshift(currentSnake[0] + direction);

    //if snake gets apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreBoard.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(movesOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake")); //making sure apple doesnt appear in div containing snake
    squares[appleIndex].classList.add("apple");
  }

  function control(e) {
    squares[currentIndex].classList.remove("snake");

    if (e.keyCode === 39) {
      direction = 1; //right arrow key on keyboard
    } else if (e.keyCode === 38) {
      direction = -width; //up arrow key on keyboard
    } else if (e.keyCode === 37) {
      direction = -1; //left arrow key on keyboard
    } else if (e.keyCode === 40) {
      direction = +width; //down arrow key on keyboard
    }
  }

  function controllerMoves() {
    if (this.id === "right") {
      direction = 1; //right arrow key on gamepad
    } else if (this.id === "up") {
      direction = -width; //up arrow key on gamepad
    } else if (this.id === "left") {
      direction = -1; //left arrow key on gamepad
    } else if (this.id === "down") {
      direction = +width; //down arrow key on gamepad
    }
  }

  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", startGame);
  gamePad.forEach((btn) => btn.addEventListener("click", controllerMoves));
});
