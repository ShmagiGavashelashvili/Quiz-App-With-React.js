import React, { useState } from "react";
import Form from "../form/form";
import "./Quizz.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Questions from "../Questions/Questions";

const Quizz = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getQuestions = async (category, dificulty, type) => {
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
  const nextQuestion = () => {
    setIndex(index + 1);
  };

  const quizAgain = () => {
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
