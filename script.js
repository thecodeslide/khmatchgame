const flipContainer = document.querySelectorAll(".flip-container");
const bgMusicIcon = document.querySelector(".bgmusicicon");
const select = document.querySelector("#select");
select.volume = 0.7;
const resetSound = document.querySelector("#resetSound");
resetSound.volume = 1;
const wrongSound = document.querySelector("#wrongSound");
wrongSound.volume = 1;
const playWrongSound = () => wrongSound.play();
const matchSound = document.querySelector("#matchMade");
matchSound.volume = 0.7;
const playMatchSound = () => matchSound.play();
const gameWinSound = document.querySelector("#gameWin");
gameWinSound.volume = 1;
const playGameWinSound = () => gameWinSound.play();
const backCard = document.querySelectorAll(".back");
const resetButton = document.querySelector(".resetButton");
const time = document.querySelector(".timer");
const moveCounter = document.querySelector(".moves");
const endGame = document.querySelector("#endGame");
let moves = 0;
let click = 0;
var startTimer;
let seconds = 0;
let matched = 0;
let cardImages = ["https://www.kingdomhearts.com/img/characters/heroes/sora.png", "https://www.kingdomhearts.com/img/characters/heroes/sora.png",
                  "https://www.kingdomhearts.com/img/characters/heroes/riku.png", "https://www.kingdomhearts.com/img/characters/heroes/riku.png",
                  "https://www.kingdomhearts.com/img/characters/heroes/kairi.png", "https://www.kingdomhearts.com/img/characters/heroes/kairi.png",
                  "https://www.kingdomhearts.com/img/characters/villains/xehanort.png", "https://www.kingdomhearts.com/img/characters/villains/xehanort.png",
                  "https://www.kingdomhearts.com/img/characters/heroes/donald.png", "https://www.kingdomhearts.com/img/characters/heroes/donald.png",
                  "https://www.kingdomhearts.com/img/characters/heroes/goofy.png", "https://www.kingdomhearts.com/img/characters/heroes/goofy.png",
                  "https://www.kingdomhearts.com/img/characters/heroes/aqua.png", "https://www.kingdomhearts.com/img/characters/heroes/aqua.png",
                  "https://www.kingdomhearts.com/img/characters/heroes/ventus.png", "https://www.kingdomhearts.com/img/characters/heroes/ventus.png"];


bgMusicIcon.addEventListener("click", e => {
  let bgMusic = document.querySelector("#bgmusic");
  bgMusic.volume = 1;
   return bgMusic.paused ? bgMusic.play() : bgMusic.pause();
});

const movesCounting = () => moveCounter.innerHTML = `${moves}`;

const movesTick = setInterval(movesCounting, 100);
const resetMoves = () => moves = 0;

const timerStartStop = (startStop) => {
  if (startStop === "start") {
  startTimer = setInterval(gameTimer, 1000);
  } else if (startStop === "stop") {
    clearInterval(startTimer);
  } else if (startStop ==="reset") {
    clearInterval(startTimer);
    seconds = 0;
    time.innerHTML = seconds;
    click = 0;
    moves = 0;
    matched = 0;
  };
};

const gameTimer = () => {
  time.innerHTML = seconds;
  seconds++;
};

flipContainer.forEach((item, index) => {
  flipContainer[index].addEventListener("click", e => {
    e.currentTarget.classList.add("hover");
    select.play();
    click++;

    if (click === 1) {
      timerStartStop("start");
    };

    while (document.querySelectorAll(".hover").length > 2) {
       turnOver();
     };

    document.querySelectorAll("div.flip-container.hover").forEach((item, index) => {
      if (document.querySelectorAll("div.flip-container.hover")[0].children[0].children[1].classList.value === document.querySelectorAll("div.flip-container.hover")[1].children[0].children[1].classList.value) {
        document.querySelectorAll("div.flip-container.hover")[0].classList.add("match");
        document.querySelectorAll("div.flip-container.hover")[1].classList.add("match");
        setTimeout(playMatchSound, 200);
        turnOver();
        moves++;
        matched++;
        if (matched === 8) {
          timerStartStop("stop");
          endGame.innerHTML = `Congratulations you completed the game in ${seconds - 1} seconds with ${moves} moves! <div class="playAgain" onclick="playAgain()">Play Again</div>`;
          endGame.style.visibility = "visible";
          setTimeout(playGameWinSound, 200);
        };
      } else {
        moves = moves + 0.5;
        setTimeout(turnOver, 500);
        setTimeout(playWrongSound, 500);
      };
    });
  });
});

const playAgain = () => {
  resetMoves(movesCounting);
  resetBoard();
  resetSound.play();
};

resetButton.addEventListener("click", e => {
  resetMoves(movesCounting);
  resetBoard();
  resetSound.play();
});

const turnOver = () => {
  flipContainer.forEach((item, index) => {
    flipContainer[index].classList.remove("hover");
  });
};

const resetBoard = () => {
  flipContainer.forEach((item, index) => {
    flipContainer[index].classList.remove("hover", "match");
  });
  setTimeout(reset, 500);
  timerStartStop("reset");
  endGame.style.visibility = "hidden";
};

const reset = () => {
  shuffle(cardImages);
  backCard[0].style.backgroundImage = `url(${cardImages[0]})`;
  backCard[1].style.backgroundImage = `url(${cardImages[1]})`;
  backCard[2].style.backgroundImage = `url(${cardImages[2]})`;
  backCard[3].style.backgroundImage = `url(${cardImages[3]})`;
  backCard[4].style.backgroundImage = `url(${cardImages[4]})`;
  backCard[5].style.backgroundImage = `url(${cardImages[5]})`;
  backCard[6].style.backgroundImage = `url(${cardImages[6]})`;
  backCard[7].style.backgroundImage = `url(${cardImages[7]})`;
  backCard[8].style.backgroundImage = `url(${cardImages[8]})`;
  backCard[9].style.backgroundImage = `url(${cardImages[9]})`;
  backCard[10].style.backgroundImage = `url(${cardImages[10]})`;
  backCard[11].style.backgroundImage = `url(${cardImages[11]})`;
  backCard[12].style.backgroundImage = `url(${cardImages[12]})`;
  backCard[13].style.backgroundImage = `url(${cardImages[13]})`;
  backCard[14].style.backgroundImage = `url(${cardImages[14]})`;
  backCard[15].style.backgroundImage = `url(${cardImages[15]})`;
  removeCardClasses();
  giveCardClasses();
};

const removeCardClasses = () => {
  backCard.forEach((item, index) => {
    backCard[index].classList.remove("sora", "riku", "kairi", "xehanort", "donald", "goofy", "aqua", "ventus");
  })
};

const giveCardClasses = () => {
  backCard.forEach((item, index) => {
    if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/sora.png")') {
      backCard[index].classList.add("sora");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/riku.png")') {
      backCard[index].classList.add("riku");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/kairi.png")') {
      backCard[index].classList.add("kairi");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/villains/xehanort.png")') {
      backCard[index].classList.add("xehanort");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/donald.png")') {
      backCard[index].classList.add("donald");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/goofy.png")') {
      backCard[index].classList.add("goofy");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/aqua.png")') {
      backCard[index].classList.add("aqua");
    } else if (backCard[index].style.backgroundImage === 'url("https://www.kingdomhearts.com/img/characters/heroes/ventus.png")') {
      backCard[index].classList.add("ventus");
    };
  });
};

const shuffle = (array) => {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};
