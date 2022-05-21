import React from 'react'

export default function Question(props){


    const[order,setOrder]=React.useState(-1)
    
    function Randomizer(){
        let tempArr=[...props.questions.incorrect_answers,props.questions.correct_answer]
        let temp=tempArr[order]
        tempArr[order]=tempArr[tempArr.length-1]
        tempArr[tempArr.length-1]=temp
        return tempArr
    }
    let combinedButtons=Randomizer()
    React.useEffect(()=>{
        let random=Math.floor(Math.random() * combinedButtons.length);
        setOrder(oldOrder=>random)
    },[props.questions])

    const styleOnCLick={
        backgroundColor:"#D6DBF5",
        border:"none",
        
    }
    function determineStyle(value){
        const styleGreen={
            backgroundColor:"#94D7A2",
            border:"none"
        }
        const styleRed={
            backgroundColor:"#F8BCBC",
            border:"none",
            color:"#4D5B9E"
        }
        const sallow={
            borderColor:"#4D5B9E",
            color:"#4D5B9E"
        }
        if(props.special!==undefined){
            if(props.special.val==="green"&&props.special.correct===value){
                return styleGreen
             }else if(props.special.val==="red"){
                if(props.special.correct===value){
                     return styleGreen
                }else if(findInChosen(value)){
                    return styleRed

                }else{
                    return sallow
                }
            }
        }else{
            if(findInChosen(value)){
                return styleOnCLick
            }else{
                return {}
            }
        }
    }
    function findInChosen(value){
        if(props.chosen===undefined) return false
        return (props.chosen.val===value?true:false)
    }
    
    //x.replace('&#039;',"'").replace('&lrm;',"'").replace(";",'').replace(";",'').replace("&uacute","ú").replace("&quot",'"').replace("&quot",'"')
   let buttons =combinedButtons.map((x,index)=>x!==""?<button key={index}className="answer--buttons" style={determineStyle(x)} value={x} id={props.id} onClick={(e)=>props.handleClick(e.target.value,e.target.id)}>{x!==undefined?(x.replace('&#039;',"'").replace('&lrm;',"'").replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace("&uacute","ú").replace("&quot",'"').replace("&quot",'"').replace("&atilde","ã").replace("&atilde","ã").replace("&uacute","ú").replace("&oacute","ó").replace("&Aring",'Å').replace("&Aring",'Å')):x}</button>:"")
   return(
        <div className='question--container'>
            <div className='question'>{props.questions.question.replace("&#039;","'").replace("&#039;","'").replace("&#039","'").replace("&quot;",'"').replace("&quot",'"').replace(";",'').replace(";",'').replace('&#039;',"'").replace('&lrm;',"'").replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace(";",'').replace("&uacute","ú").replace("&quot",'"').replace("&quot",'"').replace("&atilde","ã").replace("&atilde","ã").replace("&uacute","ú").replace("&oacute","ó").replace("&Aring",'Å').replace("&Aring",'Å')}</div>
            <div className='button--container'>
                {buttons}
             </div>
        </div>
    )
}