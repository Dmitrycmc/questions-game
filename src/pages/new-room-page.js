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

    const href = useMemo(() => "join-room?roomId=" + roomId, [roomId]);

    const onStart = useCallback(() => {
        doRequest('post', 'start-game', null, () => {
            window.location.assign(`${window.location.pathname}?roomId=${roomId}&playerName=${name}`);
        })
    }, []);

    return roomId ? (
        <div>
            <a href={href} target="_blank" rel="noopener noreferrer">
                Ссылка на комнату
            </a>
            <button onClick={onStart}>Start game</button>
            <PlayersList roomId={roomId}/>
        </div>
    ) : (
        "Processing"
    );
};

export default NewRoomPage;
