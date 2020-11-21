import React, { useEffect } from "react";
import ask from "../utils/ask";
import doRequest from "../utils/doRequest";
import PlayersList from "../components/players-list";

const JoinRoomPage = () => {
  let params = new URL(document.location).searchParams;
  let roomId = params.get("roomId");
  let name = params.get("playerName");

  useEffect(() => {
    if (!name) {
      name = ask("Enter your name!");
      doRequest(
        "post",
        "join-room",
        { name, roomId },
        res => {
          if (res.error) {
            alert(res.error);
            return;
          }
          window.location.assign(window.location.href + "&playerName=" + name);
        }
      );
    }
  }, []);

  return <PlayersList roomId={roomId} />;
};

export default JoinRoomPage;
