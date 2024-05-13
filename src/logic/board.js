import { WINNER_COMBOX } from "../constants"

export const checkWinnerFrom = (boardToCheck) =>{
    //Se chechean todas las combinaciones ganadoras
    for(const combo of WINNER_COMBOX){
      const [a,b,c ] = combo
      if(boardToCheck[a] &&
         boardToCheck[a] === boardToCheck[b] &&
         boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }

export const checkEndGame = (newBoard =>{
    return newBoard.every((Square) => Square !== null) //Verifica si todas las posiciones son diferentes en el board
  })