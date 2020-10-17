import React, { Component } from 'react';
import '../styles/questions.style.css';
import Answers from './Answers';

class Questions extends Component {
    constructor(props){
        super(props);
        this.state = {
            shuffledAnswers : [],
        }
    }
    componentDidMount(){
        this.answers();
    }

    // putting correct and inccorect answers in one array
    answers(){
        let answ = [...this.props.incorrectAnswers, this.props.correctAnswer];
        
         //shuffles answers array
        for(let i = answ.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [answ[i], answ[j]] = [answ[j], answ[i]]
        }
        this.setState({
            shuffledAnswers: answ
        })
    }
    render(){
       const { question, handleAnswer, correctAnswer } = this.props;
       const answers = this.state.shuffledAnswers.map((answ, indx) => (
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
                      {answers}
                    </div>
               </div>
            </li>
        )
    }
}

export default Questions;