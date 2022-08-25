import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { socket } from "src/hooks/useSocket";

const Score: React.FC<{ gameStatus: string }> = (props) => {
  const [username, setUsername] = useState<string>();
  const [info, setInfo] = useState<string[]>([]);
  const { pushState } = useNavigation();
  const handleStart = () => {
    socket.emit("order:start", {
      room: window.location.href.split("/")[3].split("[")[0].slice(1),
      name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
      tetraminos: undefined,
    });
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
    socket.on("info", (payload: string) => {
      const newInfo = [...info];
      newInfo.push(payload);
      setInfo(newInfo);
    });
  }, []);
  return (
    <>
      <Row justify="space-between">
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
      <Row>
        {info.map((inf, index) => {
          return <div key={index}>{inf}</div>;
        })}
      </Row>
    </>
  );
};

export default Score;
