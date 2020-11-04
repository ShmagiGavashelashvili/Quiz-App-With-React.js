import React  from 'react';

function Answers ({ handleAnswer, answ, correctAnswer }) {
   return (
      <button 
         onClick={(e) => handleAnswer(e.target.innerText, correctAnswer)}
         dangerouslySetInnerHTML={{ __html : answ}} >
    </button>
     )
  }

export default Answers;