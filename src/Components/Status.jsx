import { getFarewellText } from "./utils"
export default function Status(props) {
  
  function GameStatus() {
    if (props.isGameOver) {
      if (props.isGameWon) {
        return (
          <div className="won">
            <h2>You win!</h2>
            <p>Well done!🎉</p>
          </div>
        )
      }
      else {
        return (
          <div className="lost">
            <h2>Game over</h2>
            <p>You lose! Better start learning Assembly 😂</p>
          </div>
        )
      }     
    }
    else if(props.language != null) {

      const farewellMsg = getFarewellText(props.language);
      return (
        <div className="msg">
          <p>{
            farewellMsg
          }
          </p>
        </div>
      )
    }
  }
  return (
    <section className="game-status" aria-live="polite" role="status" >
      <GameStatus/>
    </section>
  )

}