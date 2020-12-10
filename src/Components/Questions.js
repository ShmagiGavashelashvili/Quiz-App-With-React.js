import React, { useState, useEffect } from 'react';
import '../styles/questions.style.css';
import Answers from './Answers';

function Questions ({ question, handleAnswer, correctAnswer, incorrectAnswers, guessedAnswers }){
  
   const [shuffledAnswers, setShuffledAnswers ] = useState([])
        
    useEffect(() => {
    let answ = [...incorrectAnswers, correctAnswer];
    
    //shuffles answers array
   for(let i = answ.length - 1; i > 0; i--){
       let j = Math.floor(Math.random() * (i + 1));
       [answ[i], answ[j]] = [answ[j], answ[i]]
   }
    setShuffledAnswers(answ);

   }, [incorrectAnswers, correctAnswer])

    const answersData = shuffledAnswers.map((answ, indx) => (
        <Answers 
          key={indx}
          answ={answ}
          handleAnswer={handleAnswer}
          correctAnswer={correctAnswer}
          />
     ))
     return (
        <li className='questions'>
            <p className='question-title' dangerouslySetInnerHTML={{ __html: question}}></p>
         <div className='answers'>
             <div className='btn-container'>
                 {answersData}
            </div>
         </div>
     </li>
   )
 }


export default Questions;