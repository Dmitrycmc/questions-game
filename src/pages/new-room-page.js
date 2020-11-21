import React, {useEffect, useState, useMemo} from 'react';
import doRequest from "../utils/doRequest";
import ask from "../utils/ask";
import {SERVER_ORIGIN} from "../constants";
import PlayersList from "../components/players-list";

const NewRoomPage = () => {
    const [roomId, setRoomId] = useState(null);
    useEffect(() => {
        const name = ask("Enter your name!");
        doRequest('post', SERVER_ORIGIN + '/api/new-room', {name}, ({roomId}) => {
            setRoomId(roomId);

        });
    }, []);

    const href = useMemo(() => 'join-room?roomId=' + roomId, [roomId]);

    return roomId ? <div>
        <a href={href} target="_blank" rel="noopener noreferrer">
            Ссылка на комнату
        </a>
        <button>
            Start game
        </button>
        <PlayersList roomId={roomId} />
    </div> : "Processing";
};

export default NewRoomPage;