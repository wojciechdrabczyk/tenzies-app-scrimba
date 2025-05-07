import './App.css'
import Die from "./components/Die.tsx";
import * as React from "react";
import {nanoid} from 'nanoid'

function App() {

    const [dice, setDice] = React.useState(generateAllNewDice())
    const [hasWon, setHasWon] = React.useState(false);

    function generateAllNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const random = Math.ceil(Math.random() * 6)
            newDice.push({value: random, isHeld: false, id: nanoid()})
        }
        return newDice
    }

    function rollDice() {
        setDice(prevState => {
            const newDice = prevState.map(die => {
                if (die.isHeld) {
                    return die;
                } else {
                    const randomDice = Math.ceil(Math.random() * 6);
                    return {...die, value: randomDice}
                }
            });
            const allHeld = newDice.every(die => die.isHeld);
            if (allHeld) {
                setHasWon(true)
                setTimeout(newGame, 2000)
            }
            return newDice
        });
    }

    function newGame() {
        setDice(generateAllNewDice())
        setHasWon(false)
    }

    function toggleHold(id: string) {
        setDice(prevState =>
            prevState.map(die => {
                if (die.id === id) {
                    return {...die, isHeld: !die.isHeld};
                } else {
                    return die;
                }
            })
        );
    }


    const ValueMapped = dice.map((dieValue) => (
        <Die
            key={dieValue.id}
            value={dieValue.value}
            isHeld={dieValue.isHeld}
            toggleHold={() => toggleHold(dieValue.id)}
        />
    ))

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {ValueMapped}
            </div>

            {hasWon && <p className={"win-message"}>You've won congratulations</p>}

            <button className={"dice-button"} onClick={rollDice}>Roll</button>
        </main>
    )
}

export default App
