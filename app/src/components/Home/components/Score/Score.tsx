import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { socket } from "src/hooks/useSocket";

const Score: React.FC<{ gameStatus: string }> = (props) => {
  const [info, setInfo] = useState<string[]>([]);
  const [admin, setAdmin] = useState(false);
  const handleStart = () => {
    socket.emit("order:start", {
      room: window.location.href.split("/")[3].split("[")[0],
      name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
      tetraminos: undefined,
    });
  };
  useEffect(() => {
    socket.on("info", (payload: string) => {
      const newInfo = [...info];
      newInfo.push(payload);
      setInfo(newInfo);
    });
    console.log("ouin ouin");
    socket.on("admin", () => {
      console.log("I'm Admin !");
      setAdmin(true);
    });
  }, [info]);
  return (
    <>
      <Row justify="space-between">
        <Col>{props.gameStatus}</Col>
        <Col>
          {props.gameStatus === "Waiting" && admin ? (
            <Button onClick={handleStart}>Start</Button>
          ) : null}
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
