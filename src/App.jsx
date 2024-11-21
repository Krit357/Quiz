import { useState } from "react";
import "./App.css";

function App() {
  const [pickChoice, setPickChoice] = useState({});
  const [score, setScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [actualQuiz, setActualQuiz] = useState(0);
  const handleChoiceChange = (quizId, choiceIndex) => {
    setPickChoice((prevChoice) => ({
      ...prevChoice,
      [quizId]: choiceIndex,
    }));
  };

  const handelSubmit = (quizId) => {
    const selected = pickChoice[quizId];
    const correctAnswer = quizList.find((quiz) => quiz.id === quizId)?.answer;

    if (selected === undefined) {
      return;
    }

    if (selected !== undefined) {
      if (selected + 1 === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
        console.log(`Quiz ${quizId} correct`);
      } else {
        console.log(`Quiz ${quizId} wrong`);
      }
      console.log(`Quiz ${quizId}: selected Choice  - ${selected}`);
    } else {
      console.log("No choices selected");
    }

    if (currentQuizIndex < quizList.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("complete");
    }
    setActualQuiz((prevQuiz) => prevQuiz + 1);
    console.log("actualQuiz", actualQuiz);
  };

  const reset = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setActualQuiz(0);
    setPickChoice({});
  };

  const [quizList, setQuizList] = useState([
    {
      id: 1,
      quiz: "Which language runs in a web browser?",
      choices: [
        { choice1: "Java" },
        { choice2: "C" },
        { choice3: "Python" },
        { choice4: "JavaScript" },
      ],
      answer: 4,
    },
    {
      id: 2,
      quiz: "What is your fav food?",
      choices: [
        { choice1: "ham" },
        { choice2: "bur" },
        { choice3: "ger" },
        { choice4: "errr" },
      ],
      answer: 3,
    },
  ]);

  const currentQuiz = quizList[currentQuizIndex];

  return (
    <>
      {actualQuiz < quizList.length ? (
        <div className="main-form">
          <div className="second-form">
            <div className="quiz-form" key={currentQuiz.id}>
              <p>{currentQuiz.quiz}</p>
              <div className="form-display">
                {currentQuiz.choices.map((choice, i) => (
                  <div key={i}>
                    <form className="form-list">
                      <input
                        type="radio"
                        name={`quiz-${currentQuiz.id}`}
                        checked={pickChoice[currentQuiz.id] === i}
                        onChange={() => handleChoiceChange(currentQuiz.id, i)}
                      />
                      <p>{Object.values(choice)[0]}</p>
                    </form>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  handelSubmit(currentQuiz.id);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-form">
          <div className="total-form">
            <p>
              your score {score} / {quizList.length}
            </p>
            <button onClick={reset}>restart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
