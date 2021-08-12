import React, { useState, useRef, useEffect } from "react";
import socket from "../sockets";

export const Chat = ({ users, messages, name, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = useState("");
  const messagesRef = useRef(null);

  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      roomId,
      text: messageValue,
      name,
    });
    onAddMessage({ text: messageValue, name });
    setMessageValue("");
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b> Онлайн ({users.length}): </b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages?.length &&
            messages.map((message) => (
              <div className="message">
                <p>{message.text}</p>
                <div>
                  <span>{message.name}</span>
                </div>
              </div>
            ))}
        </div>
        <form>
          <textarea
            className="form-control"
            value={messageValue}
            onChange={(event) => setMessageValue(event.target.value)}
            rows="3"
          />
          <button onClick={onSendMessage} type="button" className="button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
