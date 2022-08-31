import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import { socket } from "../../../hooks/useSocket";
import styles from "./Score.module.css";

const Score: React.FC = () => {
  const { info, admin, gameStatus, status, room, name } = useTetris();
  const { listenToInfo, listenToAdmin, start, listenToGameStatus, listenToStatus } = useTetrisActions();
  const [copied, setCopied] = useState(false);
  const handleStart = () => {
    start(socket, room, name);
  };
  useEffect(() => {
    listenToInfo(socket);
    return () => {
      socket.off("info");
    };
  }, [info]);
  useEffect(() => {
    listenToAdmin(socket);
    listenToGameStatus(socket);
    listenToStatus(socket);
    return () => {
      socket.off("admin");
      socket.off("status");
      socket.off("gameStatus");
    };
  }, []);
  return (
    <>
      {gameStatus === "Waiting" && status !== "Winner" && status !== "Game Over" ? (
        <div className={styles.flying}>
          {admin ? (
            <p style={{ margin: 0 }}>READY ?</p>
          ) : (
            <p style={{ margin: 0 }}>WAITING</p>
          )}
          {admin ? (
            <Row>
              <Button className={styles.flyingButton} onClick={handleStart}>
                <span>START</span>
              </Button>
              <Button className={styles.flyingButton} onClick={() => {navigator.clipboard.writeText(window.location.href);setCopied(true)}}>
                <span>{copied ? "COPIED" : "INVITE"}</span>
              </Button>
            </Row>
          ) : null}
        </div>
      ) : null}
      {status === "Winner" ? (
        <div className={styles.flying}>
          <p style={{ margin: 0 }}>WINNER</p>
          {admin && gameStatus === "Waiting" ? (
            <Row>
              <Button className={styles.flyingButton} onClick={handleStart}>
                <span>RESTART</span>
              </Button>
              <Button className={styles.flyingButton} onClick={() => {navigator.clipboard.writeText(window.location.href);setCopied(true)}}>
                <span>{copied ? "COPIED" : "INVITE"}</span>
              </Button>
            </Row>
          ) : null}
        </div>
      ) : null}
      {status === "Game Over" ? (
        <div className={styles.flying}>
          <p style={{ margin: 0 }}>GAME OVER</p>
          {admin && gameStatus === "Waiting" ? (
            <Row>
              <Button className={styles.flyingButton} onClick={handleStart}>
                <span>RESTART</span>
              </Button>
              <Button className={styles.flyingButton} onClick={() => {navigator.clipboard.writeText(window.location.href);setCopied(true)}}>
                <span>{copied ? "COPIED" : "INVITE"}</span>
              </Button>
            </Row>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Score;
function listenToStatus(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
  throw new Error("Function not implemented.");
}

