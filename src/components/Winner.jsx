import { Square } from "./Square.jsx"

export function Winner({winners, resetGame}){
    if (winners === null) return null

    const winnerText = winners === false? 'Empate' : 'Gano: '
    return (
        <section className='winner'>
        <div className="text">
            <h2>{winnerText}</h2>
            <header className='win'>
            {winners && <Square>{winners}</Square>}
            </header>
            <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
        </div>
        </section>
    )
}