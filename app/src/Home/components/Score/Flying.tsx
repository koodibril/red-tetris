import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import { socket } from "../../../hooks/useSocket";
import styles from "./Score.module.css";

const Score: React.FC = () => {
  const { info, admin, gameStatus, room, name } = useTetris();
  const { listenToInfo, listenToAdmin, start } = useTetrisActions();
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
    return () => {
      socket.off("admin");
    };
  }, []);
  return (
    <>
      {gameStatus === "Waiting" ? (
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
      {gameStatus === "Winner" ? (
        <div className={styles.flying}>
          <p style={{ margin: 0 }}>WINNER</p>
          {admin ? (
            <Button className={styles.flyingButton} onClick={handleStart}>
              <span>RESTART</span>
            </Button>
          ) : null}
        </div>
      ) : null}
      {gameStatus === "Game Over" ? (
        <div className={styles.flying}>
          <p style={{ margin: 0 }}>GAME OVER</p>
          {admin ? (
            <Button className={styles.flyingButton} onClick={handleStart}>
              <span>RESTART</span>
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Score;
