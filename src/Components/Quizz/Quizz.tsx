import React, { useState } from "react";
import Form from "../form/form";
import "./Quizz.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Questions from "../Questions/Questions";

export interface CurrQuiestion {
  incorrect_answers: string[],
  correct_answer: string,
  question: string
}

const Quizz = () => {
  const [data, setData] = useState<Array<CurrQuiestion>>([]);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getQuestions = async (category: number | string, dificulty: string, type: string) => {
    try {
      if (category && dificulty && type) {
        setLoading(true);
        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${dificulty}&type=${type}`
        );

        setData(data.results);
        setLoading(false);
      } else if (dificulty && type) {
        setLoading(true);
        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=10&difficulty=${dificulty}&type=${type}`
        );

        setData(data.results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const nextQuestion = (): void => {
    setIndex(index + 1);
  };

  const quizAgain = (): void => {
    setData([]);
    setIndex(0);
  };
  return (
    <div className="question-container">
      <Form getQuestions={getQuestions} />

      {loading ? (
        <Spinner />
      ) : (
        data.length > 0 && (
          <Questions
            currentQuestion={data[index]}
            data={data}
            nextQuestion={nextQuestion}
            quizAgain={quizAgain}
          />
        )
      )}
    </div>
  );
};

export default Quizz;
