import React, { useState } from 'react';
import './styles/App.css';
import axios from 'axios';
import Questions from './Components/Questions';
import Form from './Components/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

function App () {
  const [data, setData ] = useState([]);
  const [guessedAnswers, setGuessedAnswers ] = useState(0);
  const [isCorrect, setIsCorrect ] = useState(false);
  const [inCorrect, setInCorrect ] = useState(false);
  const [endTest, setEndTest ] = useState(false);
  const [ArrowUpIcon, setArrowUpIcon ] = useState(false);

   // Fetchs Question data from API
   const getQuestions = async (category, dificulty, type) => {
       // fetchts question data when category dificulty and type is chosen, All three of them
      if(category && dificulty && type){
        const APi_call = await axios.get(`https://opentdb.com/api.php?amount=7&category=${category}&difficulty=${dificulty}&type=${type}`);
        const response = APi_call.data.results;
        setData(response);
        setArrowUpIcon(true)

        // fetchs question data if dificulty and type is chosen 

      }  else if (dificulty && type){
        const APi_call = await axios.get(`https://opentdb.com/api.php?amount=7&difficulty=${dificulty}&type=${type}`);
        const response = APi_call.data.results;
        setData(response);
        setArrowUpIcon(true)
   };
  }

   // Checks if answer is Correct
   const handleAnswer = (event, correctAnswer) => {

    setGuessedAnswers(event === correctAnswer ? guessedAnswers + 1 : guessedAnswers);
    setIsCorrect(event === correctAnswer ? true : false);
    setInCorrect(event !== correctAnswer ? true : false);
    setTimeout(() => { setIsCorrect(false); setInCorrect(false) }, 800)  
     
   };

   // end Test: it shows how many guessed queston have user
   const endtest = () => { setEndTest(!endTest) }

  // play again function
   const reset = () => {
     setData([]);
     setGuessedAnswers(0);
     setEndTest(false);
     setArrowUpIcon(false)
   };

    const questions = data && data.map((qst, indx) => (
      <Questions 
        key={indx}
        question={qst.question}
        correctAnswer={qst.correct_answer}
        incorrectAnswers={qst.incorrect_answers}
        handleAnswer={handleAnswer}
        />  
    ));
    return (
       <div className="App" id='up'>
           <h1 className='App-name'>Quiz App</h1>
              { /* === displays  the result on the screen ===*/ }
                {endTest && 
                  <div className='notification'>
                    <p className='notification-msg'>{`you have ${guessedAnswers} correct answers out of ${data.length}`}</p>
                      <button className='notification-btn' onClick={reset}>Play Again</button>
                  </div>}
              {/* ====== */}

              <ol className={`question-container ${isCorrect ? 'winner' : ''} ${inCorrect ? 'lose' : ''}`}>
                <Form getQuestions={getQuestions}/>
                    {questions}
              </ol>

              {/* when data is fetched arrowUpicon is visible */}

              {ArrowUpIcon && <a href='#top'>
                <FontAwesomeIcon  icon={faArrowAltCircleUp} onClick={endtest}/>
              </a>}
       </div>
    );
}


export default App;
