import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import { socket } from "../../../hooks/useSocket";
import styles from "./Score.module.css";

const Score: React.FC = () => {
  const { info, score, nextTetra, position } = useTetris();
  const { listenToInfo, listenToAdmin, listenToNextTetra, listenToPosition } =
    useTetrisActions();
  useEffect(() => {
    listenToInfo(socket);
    return () => {
      socket.off("info");
    };
  }, [info]);
  useEffect(() => {
    listenToAdmin(socket);
    listenToNextTetra(socket);
    listenToPosition(socket);
    return () => {
      socket.off("nextTetra");
      socket.off("admin");
      socket.off("position");
    };
  }, []);
  const generateNext = () => {
    return (
      <div className={styles.next}>
        {nextTetra &&
          nextTetra.map((tetra, tindex) => {
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
          <p>Score: {score}</p>
          <p>Position: {`${position[0]} / ${position[1]}`}</p>
        </div>
      </Row>
    </Col>
  );
};

export default Score;
