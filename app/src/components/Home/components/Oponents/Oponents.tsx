import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "src/ducks/tetris/actions/tetris";
import { socket } from "src/hooks/useSocket";
import GridComponent from "src/components/Home/components/Grid/Grid";
import { Cell } from "../Grid/Grid.d";

const Oponents: React.FC<{ side: boolean }> = (props) => {
  const { listenToOponents } = useTetrisActions();
  const { oponents, position } = useTetris();
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
  useEffect(() => {
    listenToOponents(socket);
    return () => {
      socket.off("oponents");
    };
  }, []);
  const generateGrids = () => {
    const users = position[1] - 1;
    const styles = { cellSize: "", borderSize: "", padding: "" };
    switch (true) {
      case users <= 2:
        styles.cellSize = "30px";
        styles.borderSize = "10px";
        styles.padding = "5px";
        break;
      case users <= 4:
        styles.cellSize = "20px";
        styles.borderSize = "5px";
        styles.padding = "5px";
        break;
      case users <= 8:
        styles.cellSize = "15px";
        styles.borderSize = "5px";
        styles.padding = "5px";
        break;
      case users <= 16:
        styles.cellSize = "8px";
        styles.borderSize = "2px";
        styles.padding = "5px";
        break;
    }
    if (props.side && oponents) {
      //we are on the right
      return oponents.map((player, index) => {
        if (index % 2 === 0) {
          //pair
          return (
            <GridComponent
              grid={player.shadow ? player.shadow : generateGrid()}
              cellSize={styles.cellSize}
              borderSize={styles.borderSize}
              padding={styles.padding}
            ></GridComponent>
          );
        }
      });
    } else if (oponents) {
      // we are on the left
      return oponents.map((player, index) => {
        if (index % 2 !== 0) {
          //impair
          return (
            <GridComponent
              grid={player.shadow ? player.shadow : generateGrid()}
              cellSize={styles.cellSize}
              borderSize={styles.borderSize}
              padding={styles.padding}
            ></GridComponent>
          );
        }
      });
    }
  };
  return (
    <Row gutter={[16, 16]} justify="center">
      {generateGrids()}
    </Row>
  );
};

export default Oponents;
