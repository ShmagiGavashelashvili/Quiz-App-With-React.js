import React, { useState } from "react";
import "./styles/App.css";
import axios from "axios";
import Questions from "./Components/Questions";
import Form from "./Components/form";

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetchs Question data from API
  const getQuestions = async (category, dificulty, type) => {
    // fetchts question data when category dificulty and type is chosen, All three of them
    if (category && dificulty && type) {
      const APi_call = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${dificulty}&type=${type}`
      );
      const response = APi_call.data.results;
      setData(response);

      // fetchs question data if dificulty and type is chosen
    } else if (dificulty && type) {
      const APi_call = await axios.get(
        `https://opentdb.com/api.php?amount=10&difficulty=${dificulty}&type=${type}`
      );
      const response = APi_call.data.results;
      setData(response);
    }
  };
  const nextQuestion = () => {
    setIndex(index + 1);
  };
  // play again function
  const quizAgain = () => {
    setData([]);
    setIndex(0);
  };
  return (
    <div className="App" id="up">
      <h1 className="App-name">Quiz App</h1>
      <div className="question-container">
        <Form getQuestions={getQuestions} />
        {data.length > 0 && (
          <Questions
            currentQuestion={data[index]}
            data={data}
            nextQuestion={nextQuestion}
            quizAgain={quizAgain}
          />
        )}
      </div>
    </div>
  );
}

export default App;
