import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { socket } from "src/hooks/useSocket";

const Score: React.FC<{ gameStatus: string }> = (props) => {
  const [username, setUsername] = useState<string>();
  const { pushState } = useNavigation();
  const handleStart = () => {
    socket.emit("start");
  };
  const handleChange = (e: any) => {
    const user = e.target.value;
    const path = window.location.href.split("/")[3].split("[")[0];
    pushState("/" + path + "[" + user + "]");
    console.log(path);
    localStorage.setItem("username", user);
    setUsername(user);
  };
  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user ? user : "Unknown");
  }, []);
  return (
    <Row>
      <Col>{props.gameStatus}</Col>
      <Col>
        {props.gameStatus === "Waiting" && username !== "Unknown" ? (
          <Button onClick={handleStart}>Start</Button>
        ) : null}
      </Col>
      <Col>
        <Input
          disabled={props.gameStatus === "Playing"}
          onChange={handleChange}
          placeholder={username ? username : "Unknown"}
        ></Input>
      </Col>
    </Row>
  );
};

export default Score;
