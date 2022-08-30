import React, { useEffect, useMemo } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import ActionsComponent from "./components/Tetraminos/Tetraminos";
import { useInterval } from "src/hooks/useInterval";
import { Tetraminos } from "./components/Tetraminos/Tetraminos.d";
import { Cell } from "./components/Grid/Grid.d";
import { Col, Row } from "antd";
import { socket } from "src/hooks/useSocket";
import { useTetris, useTetrisActions } from "src/ducks/tetris/actions/tetris";
import OponentsComponent from "./components/Oponents/Oponents";

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
  const generateGrid = () => {
    const grid: Cell[][] = [];
    for (let i = 0; i < 22; i++) {
      const newCol = [];
      for (let j = 0; j < 12; j++) {
        if (i === 0 || j === 0 || i === 21 || j === 11) {
          newCol.push({ value: 1, color: "grey" });
        } else {
          newCol.push({ value: 0, color: "lightgrey" });
        }
      }
      grid.push(newCol);
    }
    return grid;
  };

  const checkMerge = (tetra: Tetraminos, grid: Cell[][]) => {
    let touch = false;
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
        if (
          cell === 1 &&
          tetra.x + rIndex !== 0 &&
          grid &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 0 &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 2 &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 4
        ) {
          touch = true;
        }
      });
    });
    return touch;
  };
  const createShadow = (tetra: Tetraminos, grid: Cell[][]) => {
    const newTetra = { ...tetra };
    while (!checkMerge(newTetra, grid)) {
      newTetra.x = newTetra.x + 1;
    }
    newTetra.x = newTetra.x - 1;
    return newTetra;
  };
  const printTetra = (tetra: Tetraminos, grid: Cell[][]) => {
    const shadow = createShadow(tetra, grid);
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
        if (
          cell === 1 &&
          shadow.x + rIndex > 0 &&
          shadow.x + rIndex < 21 &&
          shadow.y + cIndex > 0 &&
          shadow.y + cIndex < 11
        ) {
          grid[shadow.x + rIndex][shadow.y + cIndex].color = tetra.color;
          grid[shadow.x + rIndex][shadow.y + cIndex].value = 4;
        }
        if (
          cell === 1 &&
          tetra.x + rIndex > 0 &&
          tetra.x + rIndex < 21 &&
          tetra.y + cIndex > 0 &&
          tetra.y + cIndex < 11
        ) {
          grid[tetra.x + rIndex][tetra.y + cIndex].color = tetra.color;
          grid[tetra.x + rIndex][tetra.y + cIndex].value = 2;
        }
      });
    });
  };
  const grid = useMemo(() => {
    const grid: Cell[][] = generateGrid();
    if (merge) {
      for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 12; j++) {
          grid[i][j] = { ...merge[i][j] };
        }
      }
    }
    if (tetra) {
      printTetra(tetra, grid);
    }
    return grid;
  }, [tetra, merge]);
  const calcScore = (lines: number) => {
    switch (lines) {
      case 1:
        setScore(score + 40);
        break;
      case 2:
        setScore(score + 100);
        break;
      case 3:
        setScore(score + 300);
        break;
      case 4:
        setScore(score + 1200);
        break;
    }
  };
  const checkFullLines = (newMerge: Cell[][]) => {
    let lines = 0;
    newMerge.map((row, index) => {
      let blocks = 0;
      row.forEach((cell) => {
        if (cell.value === 1) {
          blocks++;
        }
      });
      if (
        !row.find(
          (cell, index) => cell.value === 0 && index !== 0 && index !== 11
        ) &&
        blocks !== 12
      ) {
        const newLine = [];
        for (let j = 0; j < 12; j++) {
          if (index === 0 || j === 0 || index === 21 || j === 11) {
            newLine.push({ value: 1, color: "grey" });
          } else {
            newLine.push({ value: 0, color: "lightgrey" });
          }
        }
        lines++;
        newMerge.splice(index, 1);
        newMerge.splice(1, 0, newLine);
      }
    });
    return lines;
  };
  const mergeBoard = (tetra: Tetraminos) => {
    const newMerge = grid;
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
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
    calcScore(lines);
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
