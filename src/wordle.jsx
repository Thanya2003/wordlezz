import Header from './component/header.jsx'
import './styles/wordle.css'
import Grid from './component/grid.jsx'
import Keyboard from './component/keyboard.jsx'
import getLanguageConfigs from './component/language-configs'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
function Wordle(props){

    const [searchParams] = useSearchParams();
    const width = parseInt(searchParams.get("width"))
    const height = parseInt(searchParams.get("height"))
    const language = searchParams.get("language")
    const [mysteryWord, setMysteryWord] = useState(null)
    const [validWords, setValidWords] = useState([])
    const [currentRow, setCurrentRow] =useState(0)
    const [currentWord, setCurrentWord] = useState("")
    const [guessWords, setGuessWords]= useState([])
    const [pressedKey, setPressedKey]= useState("")
    const [flashMessage, setFlashMessages]= useState(null)
    const [keyboard, setKeyboard]= useState([])
    console.log({mysteryWord})
 
    const onKeyPress=(key)=>{
        setPressedKey(key)
        
    }
    
    useEffect(()=>{
       const config =getLanguageConfigs()[language]
       fetch(config.wordsurls, {
        headers:{
            'Content-type':'application/json',
            'Accept':'applicatio/json'
        }
       })
       .then(response=> response.json())
       .then(data=>{
        const validWords= Object.keys(data)
        .filter(word=>word.length== width)
        .map(word=>word.toUpperCase())
        setValidWords(validWords)
        setMysteryWord(validWords[Math.floor(Math.random()*validWords.length)])
        setKeyboard(config.keyboard)
       })
    },[])

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
                if(validWords.includes(currentWord)){
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

    useEffect(()=>{
        const handleKeyDown=(event)=>{
            const key= event.key.toUpperCase();
            if(key==="BACKSPACE"){
                setPressedKey("BACKSPACE");
            }else if(key === "ENTER"){
                setPressedKey("ENTER");
            }else if(/^[A-Z]$/.test(key)){
                setPressedKey(key);
            }
        }
        window.addEventListener("keydown", handleKeyDown)

        return()=>{
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentWord, pressedKey, width])
    return(
        <div className="app-cont">
           <Header/> 
           {userWon && <div className='Winner'> You Win! </div>}
           {userLost && <div>
    <div className='losser'> You Lost! </div>
    <div className="mys">{mysteryWord}</div>
  </div>}
           {flashMessage!=null && <div className='flash'>{flashMessage}</div>}
           <Grid width={width} height={height} 
          content={getContent()}/>
           <Keyboard keyboardconfiguration={keyboard} onKeyPress={(key)=>onKeyPress(key)}/>
        </div>
    )
}
export default Wordle