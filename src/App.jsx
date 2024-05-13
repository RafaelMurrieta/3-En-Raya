import { Children, useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import './App.css'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { Winner } from './components/Winner.jsx'


function App() {
  const  [board, setboard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() =>{
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  });

  const [winners, setWinners] = useState(null) //null no hay ganador, false hay un empate

  const resetGame = () =>{
    setboard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinners(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) =>{ 
      if(board[index] || winners) return //Verficia si contiene algo, si es asi no actualiza
      //Actualizar el board
      const newBoard = [...board]
      newBoard[index] =  turn //X u O
      setboard(newBoard)

      const newTrun = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTrun)
      //Guarda partida
      window.localStorage.setItem('board',JSON.stringify(newBoard))
      window.localStorage.setItem('turn', newTrun);

      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner) {
        confetti()
        setWinners(newWinner)//Revisa si el juego termino
      } else if(checkEndGame(newBoard)) {
        setWinners(false)
      }
  }


  return (
    <main className='board'>
       <h1>3 EN RAYA</h1>
       <section className='game'>
        {
          board.map((square, index) =>{
            return(
              <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
       </section>
       <section className='turn'>
        <Square isSelect={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelect={turn === TURNS.O}>
          {TURNS.O}
        </Square>
       </section>
        
        <section>
          <button onClick={resetGame}>Reiniciar juego</button>
        </section>
       <Winner winners={winners} resetGame={resetGame} >

       </Winner>
    </main>
  )
}

export default App
