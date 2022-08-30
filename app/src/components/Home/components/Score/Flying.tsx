import { Button } from "antd";
import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "src/ducks/tetris/actions/tetris";
import { socket } from "src/hooks/useSocket";
import styles from "./Score.module.css";

const Score: React.FC = () => {
  const { info, admin, gameStatus, room, name } = useTetris();
  const { listenToInfo, listenToAdmin, start } = useTetrisActions();
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
            <Button className={styles.flyingButton} onClick={handleStart}>
              <span>START</span>
            </Button>
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
