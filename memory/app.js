document.addEventListener("DOMContentLoaded", () => {
  //card options
  const cardArray = [
    {
      name: "cheeseburger",
      img: "images/cheeseburger.png",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.png",
    },
    {
      name: "fries",
      img: "images/fries.png",
    },
    {
      name: "fries",
      img: "images/fries.png",
    },
    {
      name: "hotdog",
      img: "images/hotdog.png",
    },
    {
      name: "hotdog",
      img: "images/hotdog.png",
    },
    {
      name: "ice-cream",
      img: "images/ice-cream.png",
    },
    {
      name: "ice-cream",
      img: "images/ice-cream.png",
    },
    {
      name: "milkshake",
      img: "images/milkshake.png",
    },
    {
      name: "milkshake",
      img: "images/milkshake.png",
    },
    {
      name: "pizza",
      img: "images/pizza.png",
    },
    {
      name: "pizza",
      img: "images/pizza.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  var cardsChosen = [];
  var cardsChosenId = [];
  var cardsWon = [];
  var lastCard;

  //create board

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      grid.append(card);
      card.setAttribute("src", "images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
    }
  }

  createBoard();

  function flipCard() {
    let cardId = this.getAttribute("data-id");
    if (cardId != lastCard) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute("src", cardArray[cardId].img);
      lastCard = cardId;
    }
    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 500);
      lastCard = null;
    }
  }

  function checkMatch() {
    let cards = document.querySelectorAll("img");
    const choiceOneId = cardsChosenId[0];
    const choiceTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cardsWon.push(cardsChosen);
      cards[choiceOneId].setAttribute("src", "images/white.png");
      cards[choiceTwoId].setAttribute("src", "images/white.png");
      cards[choiceOneId].removeEventListener("click", flipCard);
      cards[choiceTwoId].removeEventListener("click", flipCard);
    } else {
      alert("Not a match");
      cards[choiceOneId].setAttribute("src", "images/blank.png");
      cards[choiceTwoId].setAttribute("src", "images/blank.png");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cards.length / 2) {
      alert("Congratulations - You got 'em all!");
    }
  }
}); //end DOMContentLoaded
