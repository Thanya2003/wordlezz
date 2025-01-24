import { useEffect, useState } from "react";
import getLanguageConfigs from '../component/language-configs'
import '../styles/gamesec.scss'
import { useNavigate } from "react-router-dom";
function gamesec(){
    const navigate = useNavigate()
    const[Width, setWidth]= useState(5)
    const[height, setHeight]= useState(6)
    const[words, setWords]= useState([])
    const [keyboardconfiguration, setkeyboardconfiguration]= useState([])
    const [language, setLanguage]=useState ("English")
    const [startingGame, setStartingGame] = useState(false)

    const widthchoices=[2, 3, 4, 5, 6, 7, 8]
    const heightchoices=[2, 3, 4, 5, 6, 7, 8]
    const languageChoices=getLanguageConfigs()
       
        
        const onStartGame=()=>{
            setStartingGame(true);
            navigate(`/play?width=${Width}&height=${height}&language=${language}`)
        }
return(
    <>
    <div className="new-game-cont">
        <h2>configure yor wordle game!</h2>
        <label>Choose a width</label>
        <select name="width" id="width" onChange={(e)=>setWidth(parseInt(e.target.value))}>
            {widthchoices.map((widthchoice, index)=>{
                return ( <option key={index} value={widthchoice}>{widthchoice}</option>
           ) })}
        </select>

        <label>Choose a height</label>
        <select name="height" id="height" onChange={(e)=>setHeight(parseInt(e.target.value))}>
            {heightchoices.map((heightchoice, index)=>{
                return(<option key={index} value={heightchoice}>{heightchoice}</option>
                )
                })}
        </select>

        <label>Choose a language</label>
        <select name="language" id="language" value={language} onChange={(e)=> setLanguage(e.target.value)}>
            {Object.keys(languageChoices).map((languageChoice, index)=>{   
             return(<option key={index} value={languageChoice}>{languageChoice}</option>
            )}
            )}
        </select>
        <button onClick={onStartGame}>
            Start Game!
        </button>
    </div>
    </>
)
}
export default gamesec;