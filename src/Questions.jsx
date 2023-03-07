import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trafficSigns from "./trafficSigns";

function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
 
  //shuffle function
  function shuffle(arr) {
    arr = arr.sort(() => Math.random() - 0.5);
    return arr;
  }


  function startGame() {
    if (currentQuestion > 0) {
      return;
    } else {
      shuffle(trafficSigns);
    }
  }

  startGame();

  //shuffle questions to get random order

  let correctSelected = false;
  let buttons = document.getElementsByClassName("btn");
  //check if option is correct
  function verifyAnswer(e) {
    //check if it matches the question
    if (e.target.value === trafficSigns[currentQuestion].meaning) {
      e.target.classList.remove("defaultBtn");
      e.target.classList.add("correctBtn");
      correctSelected = true;
    } else {
      let correctChoice = questionOptions.indexOf(
        trafficSigns[currentQuestion]
      );
      //make incorrect choice red and correct choice green
      e.target.classList.remove("defaultBtn");
      e.target.classList.add("incorrectBtn");

      buttons[correctChoice].classList.remove("defaultBtn");
      buttons[correctChoice].classList.add("correctBtn");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  }

  let questionOptions = [];

  function randomOptions() {
    questionOptions.push(trafficSigns[currentQuestion]);
    let i = 0;
    //loop over signs array until 4 random options are chosen
    while (i < 3) {
      //get random number
      let randomIndex = Math.floor(Math.random() * trafficSigns.length);

      //check if random option is the same as the current question
      if (questionOptions.includes(trafficSigns[randomIndex])) {
        continue;
      } else {
        questionOptions.push(trafficSigns[randomIndex]);
        i++;
      }

      for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("correctBtn");
        buttons[j].classList.remove("incorrectBtn");
        buttons[j].classList.add("defaultBtn");
      }
    }
    shuffle(questionOptions);
  }

  randomOptions();

  function handleNext() {
    if (currentQuestion === trafficSigns.length - 1) {
      document.getElementById("modal").style.visibility = "visible";
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden"
      //navigate(-1);
    } else if (correctSelected) {
      setScore(score + 1);
      setCurrentQuestion(currentQuestion + 1);
      let questionOptions = [];

      randomOptions();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handleReturn() {
    window.location.replace("/")
  }

  return (
    <section id="quiz">
      <div id="scoreboard">
        <div className="stat">
          <p className="stat__label">Question:</p>
          <p>{currentQuestion + 1}</p>
        </div>

        <div className="stat">
          <p className="stat__label">Score:</p>
          <p>{score}</p>
        </div>

        <div className="stat">
          <button id="quit-btn" type="button" onClick={handleReturn}>
            Quit
          </button>
        </div>
      </div>
      <div id="quiz__container">
        <h1>Choose the correct meaning for this sign</h1>

        <div className="sign">
          <img src={trafficSigns[currentQuestion].sign} />
        </div>

        <div className="button-container">
          <div id="option-btns">
            {questionOptions.map((option) => {
              return (
                <button
                  key={option.id}
                  type="button"
                  value={option.meaning}
                  onClick={verifyAnswer}
                  className="defaultBtn btn"
                >
                  {option.meaning}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={handleNext} id="next-btn">
            NEXT QUESTION
          </button>
        </div>
      </div>

      <div id="modal">
        <div id="modal-content">
            <h1>congratulations</h1>
            <h2>Score: {score}</h2>
            <button type="button" className="return-btn" onClick={handleReturn}>Play Again</button>
        </div>
    </div>
    </section>
  );
}

export default Questions;