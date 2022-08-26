import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { socket } from "src/hooks/useSocket";
import { rotateCounterClockwise } from "src/utils/utils";
import { Tetraminos } from "../Tetraminos/Tetraminos.d";
import styles from "./Score.module.css";

const Score: React.FC<{ gameStatus: string }> = (props) => {
  const [info, setInfo] = useState<string[]>([]);
  const [admin, setAdmin] = useState(false);
  const [next, setNext] = useState<Tetraminos[]>([]);
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
    socket.on("admin", () => {
      setAdmin(true);
    });
    return () => {
      socket.off("info");
      socket.off("admin");
    };
  }, [info]);
  useEffect(() => {
    socket.on("nextTetra", (tetras: Tetraminos[]) => {
      tetras.map((tetra) => {
        tetra.shape = rotateCounterClockwise(tetra.shape);
        return tetra;
      });
      setNext(tetras);
    });
    return () => {
      socket.off("nextTetra");
    };
  }, [next]);
  const generateNext = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          marginLeft: "10%",
          backgroundColor: "black",
        }}
      >
        {next.map((tetra, tindex) => {
          return (
            <div
              style={{
                display: "flex",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
              key={tindex}
            >
              {tetra.shape.map((row: number[], rIndex) => {
                return (
                  <div key={rIndex}>
                    {row.map((cell: number, index) => {
                      if (cell === 1) {
                        return (
                          <div
                            style={{
                              height: "20px",
                              width: "20px",
                              border: "1px solid white",
                              backgroundColor: tetra.color,
                            }}
                            key={index}
                          ></div>
                        );
                      }
                      return (
                        <div
                          style={{
                            height: "20px",
                            width: "20px",
                            backgroundColor: "black",
                          }}
                          key={index}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Col className={styles.marge}>
      NEXT
      <Row style={{ width: "200px", height: "400px" }}>{generateNext()}</Row>
      SCORE
      <Row>
        {info.map((el, index) => {
          return <p key={index}>{el}</p>;
        })}
      </Row>
      {props.gameStatus === "Waiting" && admin ? (
        <Button onClick={handleStart}>Play</Button>
      ) : (
        "Waiting for the admin to launch"
      )}
    </Col>
  );
};

export default Score;
