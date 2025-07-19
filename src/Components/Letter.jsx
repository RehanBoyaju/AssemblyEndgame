import clsx from "clsx";

export default function ({ letter , isGuessed}) {
    return (
        <span className="letter">{isGuessed && letter}</span>
    )
}