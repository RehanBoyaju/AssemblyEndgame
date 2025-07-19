import clsx from "clsx";

export default function ({ letter , isGuessed ,isGameLost}) {
    return (
        isGameLost && !isGuessed?
        <span className="letter fill">{letter}</span>:
        <span className="letter">{isGuessed && letter}</span>
    )
}