import React, { useEffect, useMemo } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import ActionsComponent from "./components/Tetraminos/Tetraminos";
import { Tetraminos } from "./components/Tetraminos/Tetraminos.d";
import { Cell } from "./components/Grid/Grid.d";
import { Col, Row } from "antd";
import OponentsComponent from "./components/Oponents/Oponents";
import { useTetris, useTetrisActions } from "../ducks/tetris/actions/tetris";
import { socket } from "../hooks/useSocket";
import { useInterval } from "../hooks/useInterval";
import { generateGrid } from "../utils/utils";
import { checkMerge } from "./components/Tetraminos/TetraminosActions";
import { calcScore, checkFullLines, printTetra } from "./HomeActions";

const Home: React.FC = () => {
  const {
    setTetra,
    setScore,
    setMerge,
    listenToNewTetra,
    listenToGameStatus,
    listenToMalus,
    gameOver,
    endTetra,
    addMalus,
  } = useTetrisActions();
  const { tetra, gameStatus, score, merge, name, room } = useTetris();

  const grid = useMemo(() => {
    let grid: Cell[][] = generateGrid();
    if (merge) {
      for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 12; j++) {
          grid[i][j] = { ...merge[i][j] };
        }
      }
    }
    if (tetra) {
      grid = printTetra(tetra, grid);
    }
    return grid;
  }, [tetra, merge]);
  const mergeBoard = (tetra: Tetraminos) => {
    const newMerge = grid;
    tetra.shape.forEach((row: number[], rIndex: number) => {
      row.forEach((cell: number, cIndex: number) => {
        if (
          (cell === 1 || cell === 3) &&
          tetra.x + rIndex > 0 &&
          tetra.x + rIndex < 21 &&
          tetra.y + cIndex > 0 &&
          tetra.y + cIndex < 11
        ) {
          newMerge[tetra.x + rIndex][tetra.y + cIndex].value = 3;
        }
      });
    });
    const lines = checkFullLines(newMerge);
    setScore(calcScore(lines, score));
    if (lines > 0) addMalus(socket, lines);
    setMerge(newMerge);
    if (newMerge[1].find((cell) => cell.value === 3)) {
      gameOver(socket, room, name, tetra, newMerge);
    } else {
      endTetra(socket, room, name, tetra, newMerge);
    }
  };
  useEffect(() => {
    listenToNewTetra(socket);
    listenToGameStatus(socket);
    listenToMalus(socket);
    return () => {
      socket.off("newTetra");
      socket.off("winner");
      socket.off("newline");
    };
  }, [merge]);
  const tick = () => {
    if (gameStatus === "Playing") {
      if (tetra && tetra.value === 2) {
        const oldTetra = { ...tetra };
        oldTetra.x = oldTetra.x + 1;
        if (checkMerge(oldTetra, grid)) {
          oldTetra.value = 2;
          oldTetra.x = oldTetra.x - 1;
          mergeBoard(oldTetra);
        } else {
          setTetra(oldTetra);
        }
      }
    }
  };
  useInterval(tick, 600);
  return (
    <Row justify="space-around">
      <Col span={6}>
        <OponentsComponent side={false}></OponentsComponent>
      </Col>
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row style={{ width: "600px" }}>
          <GridComponent
            grid={grid}
            cellSize={"35px"}
            borderSize={"10px"}
            paddingTop={"10%"}
            paddingLeft={"0px"}
            paddingBottom={"10%"}
            paddingRight={"0px"}
            status={undefined}
          ></GridComponent>
          {tetra ? <ActionsComponent grid={grid}></ActionsComponent> : null}
          <ScoreComponent></ScoreComponent>
        </Row>
      </Col>
      <Col span={6}>
        <OponentsComponent side={true}></OponentsComponent>
      </Col>
    </Row>
  );
};

export default Home;
