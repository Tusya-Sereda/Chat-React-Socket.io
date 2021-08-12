import React, { useEffect } from "react";
import "../src/App.css";
import { FormEntrance } from "./components/FormEntrance";
import { Chat } from "./components/Chat";
import axios from "axios";
import socket from "./sockets";
import reducer from "./reducer";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    name: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });

    socket.emit("ROOM:JOIN", obj); // transfer socket request to backend
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    // setUsers(data.users);
    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  };

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  window.socket = socket;
  console.log(state);

  return (
    <div className="App">
      {" "}
      {!state.joined ? (
        <FormEntrance onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}{" "}
    </div>
  );
}

export default App;
