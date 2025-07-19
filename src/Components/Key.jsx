import React from "react"
import clsx from 'clsx';

export default function ({ Letter, addLetter, word, guessedLetters, disabled}) {
    const isGuessed = guessedLetters.includes(Letter);
    const isCorrect = isGuessed && word.includes(Letter);
    const isWrong = isGuessed && !word.includes(Letter);

    
    return (
        <button 
            className=
            {clsx(
                "key",
                {"correct-key":isCorrect,
                "wrong-key":isWrong
                }
            )}
            aria-disabled={guessedLetters.includes(Letter)}
            aria-label={`Letter ${Letter}`}
            onClick={()=>addLetter(Letter)}
            disabled = {disabled}
        >
            {Letter}
        </button>
    )
}