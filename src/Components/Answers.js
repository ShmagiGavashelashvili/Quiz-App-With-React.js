import React, { Component } from 'react';

class Answers extends Component {
    render(){
        const { handleAnswer, answ, correctAnswer } = this.props;
        return (
            <button 
                onClick={(e) => handleAnswer(e.target.innerText, correctAnswer)}
                dangerouslySetInnerHTML={{ __html : answ}}>
           </button>
        )
    }
}

export default Answers;