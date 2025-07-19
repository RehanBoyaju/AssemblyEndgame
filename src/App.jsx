import Status from "./Components/Status"
import Language from "./Components/Language"
import Letter from "./Components/Letter"
import Key from "./Components/Key"
import { languages } from "./language.js"
import {words} from "./words.js"
import React from "react"
import Confetti from "./Components/Confetti.jsx"

export default function AssemblyEndgame() {

  const [word, setWord] = React.useState(()=>getRandomWord())
  const letters = [...word.toUpperCase()];
  const alphabet = ("QWERTYUIOPASDFGHJKLZXCVBNM").split("");
  const [guessedLetters, setGuessedLetters] = React.useState([]);


  const languagesToRemove = guessedLetters.filter(letter => !word.includes(letter)).length;

  const isGameWon = letters.every(letter => guessedLetters.includes(letter));
  const isGameLost = languagesToRemove >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = guessedLetters.length > 0 && !word.includes(lastGuessedLetter);

  function getRandomWord(){
    const index = Math.floor(Math.random()*words.length);
    console.log(words[index]);
    return words[index].toUpperCase();
  }

  function addLetter(letter) {
    const isGuessed = guessedLetters.includes(letter);


    setGuessedLetters(prevLetters => {
      if (isGuessed) {
        return [...prevLetters]
      }
      else {
        return [...prevLetters, letter]
      }
    })

  }

  function newGame() {
    setWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <Confetti/>}
      <header>
        <h1>Assembly Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from assembly</p>
      </header>

      <Status isGameWon={isGameWon} isGameLost={isGameLost} isGameOver={isGameOver} language={isLastGuessIncorrect ? languages[languagesToRemove - 1].name : null} />

      <section className="languages-container">

        {
          languages.map((lang, index) => {
            return <Language key={lang.name} lang={lang} isLost={index < languagesToRemove} />
          }
          )
        }
      </section>

      <section className="letters-container">
        {
          letters.map((letter, index) => (
            <Letter key={index} letter={letter} isGuessed={guessedLetters.includes(letter)} />
          ))
        }
      </section>

      {/* Combined visually hidden aria-live region for status updates. */}
      <section className="sr-only" aria-live="polite" role="status">

        <p>{word.includes(lastGuessedLetter) ?
          `Correct! The letter ${lastGuessedLetter} is in the word` :
          `Sorry, the letter ${lastGuessedLetter} is not in the word`
        }
        You have {languages.length-1} guesses left 
        </p>

        <p>Current word: {word.split("").map(letter =>
          guessedLetters.includes(letter) ?
            letter + "." :
            "blank.")
          .join(" ")}</p>
      </section>

      <section className="keyboard">

        <div className="row1">
          {
            alphabet.slice(0, 10).map(letter => (
              <Key key={letter} Letter={letter} addLetter={addLetter} word={word} guessedLetters={guessedLetters} disabled={isGameOver} />
            ))
          }
        </div>

        <div className="row2">
          {
            alphabet.slice(10, 19).map(letter => (
              <Key key={letter} Letter={letter} addLetter={addLetter} word={word} guessedLetters={guessedLetters} disabled={isGameOver} />
            ))
          }
        </div>

        <div className="row3">
          {
            alphabet.slice(19, 26).map(letter => (
              <Key key={letter} Letter={letter} addLetter={addLetter} word={word} guessedLetters={guessedLetters} disabled={isGameOver} />
            ))
          }
        </div>
      </section>

      {isGameOver && <button className="new-game" onClick={newGame}>New Game</button>}

    </main>

  )
}