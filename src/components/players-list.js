import React, {useEffect, useState} from 'react';
import doRequest from "../utils/doRequest";
import {SERVER_ORIGIN} from "../constants";

const PlayersList = ({roomId}) => {
    const [players, setPlayers] = useState(null);
    useEffect(() => {
        setInterval(() => {
            doRequest('get', SERVER_ORIGIN + '/api/room-participants?roomId=' + roomId, null, players => {
                setPlayers(players);
            });
        }, 3000);
    }, []);


    return players ? (<>
        Players:
        {players && <ol>
            {players.map(player => (<li key={player}>{player}</li>))}
        </ol>}
        </>) : "Processing";
};

export default PlayersList;