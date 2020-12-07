import React, {useEffect, useState, useMemo, useCallback} from "react";
import doRequest from "../utils/doRequest";
import ask from "../utils/ask";
import PlayersList from "../components/players-list";

const NewRoomPage = () => {
    const [roomId, setRoomId] = useState(null);
    const [name, setName] = useState(null);
    useEffect(() => {
        const name = ask("Enter your name!");
        setName(name);
        doRequest(
            "post",
            "new-room",
            {name},
            ({roomId}) => {
                setRoomId(roomId);
            }
        );
    }, []);

    const href = useMemo(() => "room?roomId=" + roomId, [roomId]);

    const onStart = useCallback(() => {
        doRequest('post', 'start-game', {roomId}, () => {
            window.location.assign(`/room?roomId=${roomId}&playerName=${name}`);
        })
    }, [roomId]);

    return roomId ? (
        <div>
            <a href={href} target="_blank" rel="noopener noreferrer">
                Ссылка на комнату
            </a>
            <button onClick={onStart}>Start game</button>
            <PlayersList roomId={roomId} playerName={name}/>
        </div>
    ) : (
        "Processing"
    );
};

export default NewRoomPage;
