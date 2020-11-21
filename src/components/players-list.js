import React, { useEffect, useState, useCallback } from "react";
import doRequest from "../utils/doRequest";
import { SERVER_ORIGIN } from "../constants";

const PlayersList = ({ roomId }) => {
  const [players, setPlayers] = useState(null);

  const refresh = useCallback(() => {
    doRequest(
      "get",
      SERVER_ORIGIN + "/api/room-participants?roomId=" + roomId,
      null,
      players => {
        setPlayers(players);
      }
    );
  }, []);

  useEffect(() => {
    refresh();
    setInterval(refresh, 5000);
  }, []);

  return (
    <div>
      <div>Players:</div>
      {players ? (
        <ol>
          {players.map(player => (
            <li key={player}>{player}</li>
          ))}
        </ol>
      ) : (
        "Processing"
      )}
    </div>
  );
};

export default PlayersList;
