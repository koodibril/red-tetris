import { Row } from "antd";
import React, { useEffect, useMemo } from "react";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import { socket } from "../../../hooks/useSocket";
import GridComponent from "../Grid/Grid";
import { Oponent } from "../../../ducks/tetris/tetrisSlice";
import { generateGrid } from "../../../utils/utils";

const Oponents: React.FC<{ side: boolean }> = (props) => {
  const { listenToOponents } = useTetrisActions();
  const { oponents, position, gameStatus } = useTetris();
  useEffect(() => {
    listenToOponents(socket);
    return () => {
      socket.off("oponents");
    };
  }, []);
  const generateGrids = useMemo(() => {
    const users = position[1] - 1;
    const id = socket.id;
    const styles = {
      cellSize: "",
      borderSize: "",
      paddingTop: "",
      paddingLeft: "",
      paddingRight: "",
      paddingBottom: "",
    };
    switch (true) {
      case users <= 2:
        styles.cellSize = "30px";
        styles.borderSize = "10px";
        styles.paddingLeft = "5%";
        styles.paddingTop = "10%";
        styles.paddingBottom = "0px";
        styles.paddingRight = "5%";
        break;
      case users <= 4:
        styles.cellSize = "20px";
        styles.borderSize = "5px";
        styles.paddingLeft = "5%";
        styles.paddingTop = "5%";
        styles.paddingBottom = "0px";
        styles.paddingRight = "5%";
        break;
      case users <= 8:
        styles.cellSize = "15px";
        styles.borderSize = "5px";
        styles.paddingLeft = "5px";
        styles.paddingTop = "10%";
        styles.paddingBottom = "0px";
        styles.paddingRight = "5px";
        break;
      case users <= 16:
        styles.cellSize = "8px";
        styles.borderSize = "2px";
        styles.paddingLeft = "5%";
        styles.paddingTop = "10%";
        styles.paddingBottom = "0px";
        styles.paddingRight = "0px";
        break;
    }
    if (props.side) {
      //we are on the right
      if (oponents) {
        const filtered = oponents.filter(
          (oponent: Oponent) => oponent.id !== id
        );
        return filtered.map((player, index) => {
          if (index % 2 === 0) {
            //pair
            return (
              <GridComponent
                grid={player.shadow ? player.shadow : generateGrid()}
                cellSize={styles.cellSize}
                borderSize={styles.borderSize}
                paddingTop={styles.paddingTop}
                paddingLeft={styles.paddingLeft}
                paddingBottom={styles.paddingBottom}
                paddingRight={styles.paddingRight}
                status={player.status}
                key={index}
              ></GridComponent>
            );
          }
        });
      } else {
        return [...Array(users)].map((e, index) => {
          if (index % 2 === 0) {
            //pair
            return (
              <GridComponent
                grid={generateGrid()}
                cellSize={styles.cellSize}
                borderSize={styles.borderSize}
                paddingTop={styles.paddingTop}
                paddingLeft={styles.paddingLeft}
                paddingBottom={styles.paddingBottom}
                paddingRight={styles.paddingRight}
                status={gameStatus}
                key={index}
              ></GridComponent>
            );
          }
        });
      }
    } else if (!props.side) {
      // we are on the left
      if (oponents) {
        const filtered = oponents.filter(
          (oponent: Oponent) => oponent.id !== id
        );
        return filtered.map((player, index) => {
          if (index % 2 !== 0) {
            //impair
            return (
              <GridComponent
                grid={player.shadow ? player.shadow : generateGrid()}
                cellSize={styles.cellSize}
                borderSize={styles.borderSize}
                paddingTop={styles.paddingTop}
                paddingLeft={styles.paddingLeft}
                paddingBottom={styles.paddingBottom}
                paddingRight={styles.paddingRight}
                status={player.status}
                key={index}
              ></GridComponent>
            );
          }
        });
      } else {
        return [...Array(users)].map((e, index) => {
          if (index % 2 !== 0) {
            //pair
            return (
              <GridComponent
                grid={generateGrid()}
                cellSize={styles.cellSize}
                borderSize={styles.borderSize}
                paddingTop={styles.paddingTop}
                paddingLeft={styles.paddingLeft}
                paddingBottom={styles.paddingBottom}
                paddingRight={styles.paddingRight}
                status={gameStatus}
                key={index}
              ></GridComponent>
            );
          }
        });
      }
    }
  }, [oponents, position, gameStatus]);
  return (
    <Row gutter={[0, 0]} justify="center">
      {generateGrids}
    </Row>
  );
};

export default Oponents;
