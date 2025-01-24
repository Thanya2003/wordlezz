import Wordle from "./wordle"
import GameSelection from  "./component/gamesec"
import {
  BrowserRouter,
  Routes, 
  Route
} from "react-router-dom"
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<GameSelection/>}></Route>
       <Route path="/play" element={<Wordle/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
