import React, { useState, useEffect } from "react";
import _ from "lodash";
import "../styles/questions.style.css";

function Questions({ currentQuestion, nextQuestion, quizAgain, data }) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedIndx, setSelectedIndx] = useState(null);
  const [correctIndx, setCorrectIndex] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    let answ = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    setShuffledAnswers(_.shuffle(answ));
  }, [currentQuestion.incorrect_answers, currentQuestion.correct_answer, currentQuestion]);

  useEffect(() => {
    setCorrectIndex(shuffledAnswers.indexOf(currentQuestion.correct_answer));
  }, [shuffledAnswers, currentQuestion.correct_answer, currentQuestion]);

  const selectedAnswer = (indx) => {
    setSelectedIndx(indx);
  };
  const submetedAnswer = () => {
    if (correctIndx === selectedIndx) {
      setCorrectAnswer(correctAnswer + 1);
    }
    setAnswered(true);
    setTotalAnswer(totalAnswer + 1);
  };
  const nextHandler = () => {
    nextQuestion();
    setCorrectIndex(null);
    setSelectedIndx(null);
    setAnswered(false);
  };
  return (
    <>
      {totalAnswer < data.length ? (
        <li className="questions">
          <p
            className="question-title"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></p>
          <div className="answers">
            <div className="btn-container">
              {shuffledAnswers.map((answ, indx) => (
                <button
                  key={indx}
                  dangerouslySetInnerHTML={{ __html: answ }}
                  onClick={() => selectedAnswer(indx)}
                  className={`
                      ${
                        !answered && selectedIndx === indx
                          ? "selected"
                          : answered && correctIndx === indx
                          ? "winner"
                          : answered && selectedIndx === indx && correctIndx !== indx
                          ? "lose"
                          : ""
                      }`}
                  disabled={answered}
                ></button>
              ))}
              <button
                className="submit-btn"
                onClick={() => submetedAnswer()}
                disabled={selectedIndx === null || answered}
              >
                {" "}
                Submit
              </button>
              <button className="submit-btn" onClick={() => nextHandler()} disabled={!answered}>
                Next
              </button>
            </div>
          </div>
        </li>
      ) : totalAnswer === data.length ? (
        <div className="notification">
          <p className="notification-msg">{`you have ${correctAnswer} correct answers out of ${totalAnswer}`}</p>
          <button className="notification-btn" onClick={quizAgain}>
            Quiz Again?
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Questions;
