import "./styles/App.css";
import Quizz from "./Components/Quizz/Quizz";

function App(): JSX.Element {
  return (
    <div className="App" id="up">
      <h1 className="App-name">Quiz App</h1>
      <Quizz />
    </div>
  );
}

export default App;
