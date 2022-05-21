import React from 'react'
import blob1 from "../blob/yellow.svg"
import blob2 from "../blob/blue.svg"
import Question from './Question'


export default function Quizz(){

    const[playAgain,setPlayAgain]=React.useState(false)
    const[newGame,setNewGame]=React.useState(false)
    const[questions,setQuestions]=React.useState([])
    const [chosen,setChosen]=React.useState([])
    const[specialAttributes,setSpecialAttributes]=React.useState([])
    const[points,setPoints]=React.useState(0)

    React.useEffect(()=>{
        fetch('http://opentdb.com/api.php?amount=5')
        .then(response => response.json())
        .then(data => setQuestions(data.results));
    },[newGame])

    function click(val,id){
        if(!playAgain){
        setChosen(old=>old.filter(x=>x.id!==id))
        setChosen(old=>[...old,{id,val}])  
        }
    }
   
    const questionsToDisplay=questions.map((quest,index)=><Question special={specialAttributes.find(spec=>spec.id===index.toString())} chosen={chosen.find(x=>x.id===index.toString())} questions={questions[index]} playAgain={playAgain}id={index} key={index} handleClick={click}/>)
    function checkAnswers(){
        
        let pointsv=0
        for(let i=0;i<chosen.length;i++){
            if(questions[chosen[i].id].correct_answer===chosen[i].val){
                pointsv++
            }
        }
        setPoints(pointsv)
        let special=[]
        chosen.forEach(x=>determineSpecialAttribute(x,special))
        setSpecialAttributes(special)

        setPlayAgain(old=>!old)
        
    }
    function determineSpecialAttribute(x,special){
       
        if(questions[x.id].correct_answer===x.val){
            special.push({id:x.id,val:"green",correct:x.val})
        }else{
            special.push({id:x.id,val:"red",correct:questions[x.id].correct_answer})
        }
    }
    function newGameF(){
        setChosen([])
        setSpecialAttributes([])
        setNewGame(old=>!old)
        setPlayAgain(old=>!old)
    }
    return(
        <div className="start">
        <img id="blob1"className="blob"src={blob1} alt="yellow blob"/>
        <div id="quizz--container">
            {questionsToDisplay}
             <div id="check-button-div">
            {!playAgain?<button id="button" className="check"onClick={checkAnswers}>Check answers</button>:(<div className='newGame--container'><button id="button" className="check" onClick={newGameF}>New Game</button><div>You scored {points}/{questions.length} correct answers</div></div>)}
            </div>
        </div>
        
        <img id="blob2" className="blob" src={blob2} alt="blue blob"/>
    </div>
    )
}