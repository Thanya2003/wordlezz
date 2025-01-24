import '../styles/keyboard.scss'

function Keyboard(props){
    const chara= props.keyboardconfiguration
    return(
        <>
        <div className="keyboard-container">
        {chara.map((row, i)=>{
            return(
            <div className="row-container" key={i}>
                {row.map((character, j)=>{
                    return(
                        <div className="key-button" key={j} onClick={()=> props.onKeyPress(character)}>
                            {character}
                        </div>
                    )
                })}
            </div>
            )
        })}
        </div>
        </>
    )
}
export default Keyboard