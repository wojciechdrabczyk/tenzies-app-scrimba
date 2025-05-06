import './App.css'
import Die from "./components/Die.tsx";
import * as React from "react";
import die from "./components/Die.tsx";
import { nanoid } from 'nanoid'

function App() {

    const [dice, setDice] = React.useState(generateAllNewDice())

    function generateAllNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const random = Math.ceil(Math.random() * 6)
            newDice.push({value: random, isHeld: false})
        }
        return newDice
    }

    function rollDice() {
        setDice(generateAllNewDice)
    }

    function toggleHold(index) {
        setDice(prevState =>
            prevState.map((die, i) => {
                if (i === index) {
                    return {
                        ...die,
                        isHeld: !die.isHeld
                    }
                } else {
                    return die
                }
            })
        )
    }

    const ValueMapped = dice.map((dieValue, index) => (
        <Die
            key={index}
            value={dieValue.value}
            isHeld={dieValue.isHeld}
            toggleHold={() => toggleHold(index)}
        />
    ))

    return (
        <main>
            <div className="dice-container">
                {ValueMapped}
            </div>

            <button className={"dice-button"} onClick={rollDice}>Roll</button>
        </main>
    )
}

export default App
