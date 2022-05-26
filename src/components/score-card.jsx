/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const ScoreCard = ({winner, mark}) => {
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  useEffect(() => {
    if (winner && mark === 'X') {
      setScoreX(scoreX + 1);
    } else if (winner && mark === 'O') {
      setScoreO(scoreO + 1)
    }
    return;
    // pass the listener in the []
    // leave it blank if you want to mount it once
  }, [winner]);

  return (
    <div>
      <h1 className='font-header text-2xl tracking-widest'>X: {scoreX} vs O: {scoreO}</h1>
    </div>
  );
}

export default ScoreCard;