import React, {Component} from 'react';
import './styles/App.css';
import axios from 'axios';
import Questions from './Components/Questions';
import Form from './Components/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
   constructor(props){
     super(props);
     this.state = {
        data: [],
        guessedAnswers : 0,
        isCorrect: false,
        inCorrect : false,
        endTest : false,
        ArrowUpIcon : false
     };
   this.handleAnswer = this.handleAnswer.bind(this);
   this.reset = this.reset.bind(this);
   this.endtest = this.endtest.bind(this);
   };

   // Fetchs Question data from API
   getQuestions = async (category, dificulty, type) => {
       // fetchts question data when category dificulty and type is chosen, All three of them
      if(category && dificulty && type){
        const APi_call = await axios.get(`https://opentdb.com/api.php?amount=7&category=${category}&difficulty=${dificulty}&type=${type}`);
        const response = APi_call.data.results;
        this.setState({
          data : response,
          ArrowUpIcon: true
        });

        // fetchs question data if dificulty and type is chosen 

      }  else if (dificulty && type){
        const APi_call = await axios.get(`https://opentdb.com/api.php?amount=7&difficulty=${dificulty}&type=${type}`);
        const response = APi_call.data.results;
        this.setState({
          data : response,
          ArrowUpIcon: true
        });
      };
   };

   // Checks if answer is Correct
   handleAnswer(event, correctAnswer){
      this.setState({
        guessedAnswers : event === correctAnswer ? this.state.guessedAnswers + 1 : this.state.guessedAnswers,
        isCorrect : event === correctAnswer ? true : false,
        inCorrect : event !== correctAnswer ? true : false,
      });
    setTimeout(() => {
        this.setState({
          isCorrect : false,
          inCorrect : false,
        })
      }, 800)  
     
   };

   // end Test: it shows how many guessed queston have user
   endtest(){
     this.setState({
       endTest : !this.state.endTest
     })
    }

  // play again function
   reset(){
     this.setState({
      data: [],
      guessedAnswers : 0,
      clickedForAnswer : true,
      endTest : false,
      ArrowUpIcon: false
     });
   };
  render(){
    const { data, isCorrect, inCorrect, endTest, guessedAnswers, ArrowUpIcon } = this.state;
    const questions = data && data.map((qst, indx) => (
      <Questions 
        key={indx}
        question={qst.question}
        correctAnswer={qst.correct_answer}
        incorrectAnswers={qst.incorrect_answers}
        handleAnswer={this.handleAnswer}
        />  
    ));
    return (
       <div className="App" id='up'>
           <h1 className='App-name'>Quiz App</h1>

              { /* === displays  the result on the screen ===*/ }
                {endTest && 
                  <div className='notification'>
                    <p className='notification-msg'>{`you have ${guessedAnswers} correct answers out of ${data.length}`}</p>
                      <button className='notification-btn' onClick={this.reset}>Play Again</button>
                  </div>}
              {/* ====== */}

              <ol className={`question-container ${isCorrect ? 'winner' : ''} ${inCorrect ? 'lose' : ''}`}>
                <Form getQuestions={this.getQuestions}/>
                    {questions}
              </ol>

              {/* when data is fetched arrowUpicon is visible */}

              {ArrowUpIcon && <a href='#top'>
                <FontAwesomeIcon  icon={faArrowAltCircleUp} onClick={this.endtest}/>
              </a>}
       </div>
    );
  }
}

export default App;
