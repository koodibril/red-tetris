import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { socket } from "src/hooks/useSocket";
import { rotateCounterClockwise } from "src/utils/utils";
import { Tetraminos } from "../Tetraminos/Tetraminos.d";
import styles from "./Score.module.css";

const Score: React.FC<{ gameStatus: string; score: number; reset: any }> = (
  props
) => {
  const [info, setInfo] = useState<string[]>([]);
  const [admin, setAdmin] = useState(false);
  const [next, setNext] = useState<Tetraminos[]>([]);
  const [position, setPosition] = useState([1, 1]);
  const handleStart = () => {
    props.reset();
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
  useEffect(() => {
    socket.on("position", (position: [number, number]) => {
      setPosition(position);
    });
    return () => {
      socket.off("nextTetra");
    };
  }, []);
  const generateNext = () => {
    return (
      <div className={styles.next}>
        {next.map((tetra, tindex) => {
          return (
            <div className={styles.tetra} key={tindex}>
              {tetra.shape.map((row: number[], rIndex) => {
                return (
                  <div key={rIndex}>
                    {row.map((cell: number, index) => {
                      if (cell === 1) {
                        return (
                          <div
                            className={styles.tetrablock}
                            style={{
                              backgroundColor: tetra.color,
                            }}
                            key={index}
                          ></div>
                        );
                      }
                      return (
                        <div
                          className={styles.tetrablock}
                          style={{
                            backgroundColor: "black",
                            border: "none",
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
      <p className={styles.scoreTitles}>NEXT</p>
      <Row style={{ width: "150px", height: "400px" }}>{generateNext()}</Row>
      <p className={styles.scoreTitles}>SCORE</p>
      <Row style={{ width: "150px", height: "253px" }}>
        <div className={styles.score}>
          <p>Score: {props.score}</p>
          <p>Position: {`${position[0]} / ${position[1]}`}</p>
        </div>
      </Row>
      {props.gameStatus === "Waiting" ? (
        <div className={styles.flying}>
          {admin ? (
            <p style={{ margin: 0 }}>READY ?</p>
          ) : (
            <p style={{ margin: 0 }}>WAITING</p>
          )}
          {admin ? (
            <Button className={styles.flyingButton} onClick={handleStart}>
              <span>START</span>
            </Button>
          ) : null}
        </div>
      ) : null}
      {props.gameStatus === "Winner" ? (
        <div className={styles.flying}>
          <p style={{ margin: 0 }}>WINNER</p>
          {admin ? (
            <Button className={styles.flyingButton} onClick={handleStart}>
              <span>RESTART</span>
            </Button>
          ) : null}
        </div>
      ) : null}
      {props.gameStatus === "Game Over" ? (
        <div className={styles.flying}>
          <p style={{ margin: 0 }}>GAME OVER</p>
          {admin ? (
            <Button className={styles.flyingButton} onClick={handleStart}>
              <span>RESTART</span>
            </Button>
          ) : null}
        </div>
      ) : null}
    </Col>
  );
};

export default Score;
