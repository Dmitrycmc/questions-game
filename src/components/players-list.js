import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import doRequest from "../utils/doRequest";
import ask from "../utils/ask";

const PlayersList = ({ roomId, playerName }) => {
  const [players, setPlayers] = useState(null);
  const [status, setStatus] = useState(null);

  const refresh = useCallback(() => {
    doRequest(
      "get",
      `room-status?roomId=${roomId}&playerName=${playerName}`,
      null,
        ({players, status}) => {
        setStatus(status);
        setPlayers(players);
      }
    );
  }, []);

  useEffect(() => {
    refresh();
    setInterval(refresh, 5000);
  }, []);

  const needAnswer = useMemo(() => status !== "Ожидание игроков" && players && !players[playerName]
    , [players, status]);

  const inputRef = useRef();

  const onAnswer = useCallback(() => {
      const answer = inputRef.current.value;
      doRequest('post', 'answer', {answer, playerName, roomId})
  }, [playerName, roomId]);

  return (
    <div>
      <div>Players:</div>
      {players && (
          <ol>
            {Object.keys(players).map(player => (
                <li key={player}>{player}</li>
            ))}
          </ol>
      )}
      <div>Status: {status}</div>
        {needAnswer && <input ref={inputRef} type="text"/>}
        {needAnswer && <button onClick={onAnswer}>Send</button>}
    </div>
  );
};

export default PlayersList;
