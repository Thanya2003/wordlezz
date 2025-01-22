import Header from './component/header.jsx'
import './styles/wordle.css'
import Grid from './component/grid.jsx'
function wordle(){
    const width=5
    const height=6
    return(
        <div className="app-cont">
           <Header/> 
           <Grid width={width} height={height}/>
        </div>
        
    )
}
export default wordle