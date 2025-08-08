import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      askUserName();
      console.log("서버에 성공적으로 연결되었습니다.");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("서버와 연결이 끊겼습니다.");
    });

    socket.on("message", (message) => {
      setMessageList((prev) => [...prev, message]);
    });
  }, []);

  const askUserName = () => {
    const userName = prompt("Enter your name:");
    console.log("User name:", userName);

    socket.emit("login", userName, (res) => {
      console.log("Res", res);

      if (res.ok) {
        setUser(res.data);
      }
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit("sendMessage", message, (res) => {
      console.log("Message sent response:", res);
    });
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        {isConnected ? (
          <InputField
            value={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
