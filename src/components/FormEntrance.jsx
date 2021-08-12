import axios from "axios";
import React, { useState } from "react";
import socket from "../sockets";

export const FormEntrance = ({ onLogin }) => {
  const [roomId, setRoom] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const clickHandler = async () => {
    if (roomId && name) {
      const obj = {
        roomId,
        name,
      };
      setLoading(true);
      await axios.post("/rooms", obj);
      onLogin(obj);
    } else {
      alert("Должны быть заполнены оба поля!");
    }
  };

  return (
    <div className="registerBlock">
      <input
        className="room"
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(event) => setRoom(event.target.value)}
      />
      <input
        className="name"
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => clickHandler()}
          disabled={isLoading}
        >
          {isLoading ? "ВХОД..." : "Войти"}
        </button>
      </div>
    </div>
  );
};
