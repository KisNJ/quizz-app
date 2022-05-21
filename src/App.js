
import './index.css';
import React from "react"
import StartQuiz from './components/StartQuiz';
import Quizz from "./components/Quizz"

function App() {
  const[clicked,setClicked]=React.useState(false)
  function startButton(){
    setClicked(true)
  }
  return (
    <div className="App">
      {clicked?<Quizz/>:<StartQuiz handleClick={startButton}/>}
    </div>
  );
}

export default App;
