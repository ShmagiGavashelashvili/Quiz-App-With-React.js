import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import "./questions.style.css";
import { CurrQuiestion } from '../Quizz/Quizz'



interface QuestionProps {
  currentQuestion: CurrQuiestion,
  nextQuestion(): void,
  quizAgain(): void,
  data: Array<object>
}

function Questions({ currentQuestion, nextQuestion, quizAgain, data }: QuestionProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [selectedIndx, setSelectedIndx] = useState<number | null>(null);
  const [correctIndx, setCorrectIndex] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [totalAnswer, setTotalAnswer] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);

  useEffect(() => {
    let answ: string[] = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    setShuffledAnswers(shuffle(answ));
  }, [currentQuestion.incorrect_answers, currentQuestion.correct_answer, currentQuestion]);

  useEffect(() => {
    setCorrectIndex(shuffledAnswers.indexOf(currentQuestion.correct_answer));
  }, [shuffledAnswers, currentQuestion.correct_answer, currentQuestion]);

  const selectedAnswer = (indx: number): void => {
    setSelectedIndx(indx);
  };
  const submetedAnswer = (): void => {
    if (correctIndx === selectedIndx) {
      setCorrectAnswer((prev): number => prev + 1);
    }
    setAnswered(true);
    setTotalAnswer((prev): number => prev + 1);
  };
  const nextHandler = (): void => {
    nextQuestion();
    setCorrectIndex(null);
    setSelectedIndx(null);
    setAnswered(false);
  };
  return (
    <>
      {totalAnswer < data.length ? (
        <li className="questions">
          {totalAnswer + 1}
          <p
            data-testid="question"
            className="question-title"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></p>
          <div className="answers">
            <div className="btn-container">
              {shuffledAnswers.map((answ, indx): JSX.Element => (
                <button
                  key={indx}
                  data-testid={`answers-${indx}`}
                  dangerouslySetInnerHTML={{ __html: answ }}
                  onClick={() => selectedAnswer(indx)}
                  className={`${!answered && selectedIndx === indx
                    ? "selected"
                    : answered && correctIndx === indx
                      ? "winner"
                      : answered && selectedIndx === indx && correctIndx !== indx
                        ? "lose"
                        : null
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
      ) : null}
    </>
  );
}

export default Questions;
