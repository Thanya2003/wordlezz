import Header from './component/header.jsx'
import './styles/wordle.css'
import Grid from './component/grid.jsx'
import Keyboard from './component/keyboard.jsx'
import english_words from './component/english.json'
import { useEffect, useState } from 'react'
function Wordle(){

    const [currentRow, setCurrentRow] =useState(0)
    const [currentWord, setCurrentWord] = useState("")
    const [guessWords, setGuessWords]= useState([])
    const [pressedKey, setPressedKey]= useState("")
    const [flashMessage, setFlashMessages]= useState(null)
    
    const width=5
    const height=6
    const validEnglish=Object.keys
        (english_words).filter((word)=>
        (word.length===width)).map((word)=> word.toUpperCase())
        const [mysteryWord, setMysteryWord] = useState(
            validEnglish[Math.floor(Math.random()*(validEnglish.length))]
        )
    const onKeyPress=(key)=>{
        setPressedKey(key)
        
    }
    
    useEffect(()=>{
        if(pressedKey===""){
            return;
        }
        // if pressed letter
            // current word== width, ntg
            // current word< width, add charater
        if(pressedKey!=='ENTER' && pressedKey!=='BACKSPACE'){
            if(currentWord===width){

            }else{
                setCurrentWord(currentWord+pressedKey)
            }
        }
        // if pressed backspace
            // current word == empty, ntg
            // current word at least char, remove last char 
        if(pressedKey === 'BACKSPACE'){
            if(currentWord===""){

            }else{
                setCurrentWord(currentWord.slice(0,-1))
            }
        }
        // if pressed enter
            // current<width, log not enough
            // current word = width:
                // if word in dictionary
                    //increment row, add word to guessedwords, set current word blank
                //current word not in dictionar
                    // show "not in word list"
        
        if(pressedKey==="ENTER"){
            if(currentWord.length<width){
                flash("Not enough letters")
            }else{
                if(validEnglish.includes(currentWord)){
                    setCurrentRow(currentRow+1)
                    setGuessWords([...guessWords, currentWord])
                    setCurrentWord("")
                }else{
                    flash("not in word list")
                }
            }
        }
        // End of scenario
            
        setPressedKey("")
    }, [pressedKey])

    const flash =(Message)=>{
        setFlashMessages(Message)
        setTimeout(()=>{
            setFlashMessages(null)
        }, 1000)
    }
    const getContent=()=>{
        const objectToReturn={}
        for(let CurrentWordIndex=0; CurrentWordIndex<currentWord.length; CurrentWordIndex++){
            objectToReturn[`${currentRow}, ${CurrentWordIndex}`]={
                color:'black',
                text:currentWord[CurrentWordIndex]
            }
        }
        guessWords.forEach((guessWord, rowNumber)=>{
            for(let guessWordIndex=0; guessWordIndex<guessWord.length; guessWordIndex++){
                const gridRowNumber= rowNumber
                const gridColumnNumber= guessWordIndex
                const character=guessWord[guessWordIndex]

                let color;
                if(!mysteryWord.includes(character)){
                    color="grey"
                }
                else if(mysteryWord[guessWordIndex] === character){
                    color="green"
                }
                else{
                    color="yellow"
                }
                objectToReturn[`${gridRowNumber}, ${gridColumnNumber}`]={
                    color: color,
                    text: character

                }

            }
        })
        return objectToReturn;
    }
    const userWon=guessWords.includes(mysteryWord)
    const userLost= !guessWords.includes(mysteryWord) && guessWords.length==height
    return(
        <div className="app-cont">
           <Header/> 
           {userWon && <div className='Winner'> You Win! </div>}
           {userLost && <div className='losser'> You Lost! </div>}
           {flashMessage!=null && <div className='flash'>{flashMessage}</div>}
           <Grid width={width} height={height} 
          content={getContent()}/>
           <Keyboard onKeyPress={(key)=>onKeyPress(key)}/>
        </div>
        
    )
}
export default Wordle