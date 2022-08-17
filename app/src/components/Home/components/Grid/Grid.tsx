import React, { useMemo } from "react";
import styles from "./Grid.module.css";

const Grid: React.FC<{
  tetra: any;
}> = (props) => {
  const row = 22;
  const cols = 12;

  const grid = useMemo(() => {
    const grid: { x: number; y: number; value: string }[][] = [];
    for (let i = 0; i < row; i++) {
      const newCol = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 || j === 0 || i === 21 || j === 11) {
          newCol.push({ x: i, y: j, value: "grey" });
        } else {
          newCol.push({ x: i, y: j, value: "lightgrey" });
        }
      }
      grid.push(newCol);
    }
    const tetra = props.tetra;
    tetra.shape.map((row: any, rIndex: number) => {
      row.map((cell: any, cIndex: number) => {
        if (cell === 1) {
          grid[tetra.x + rIndex][tetra.y + cIndex].value = tetra.color;
        }
      });
    });
    return grid;
  }, [props.tetra]);

  const generateGrid = () => {
    return grid.map((el) => {
      return (
        <div className={styles.row} key={el[0].x}>
          {el.map((cas) => {
            const cell = (
              <div
                className={styles.cell}
                style={{ backgroundColor: cas.value }}
                key={cas.y}
              ></div>
            );
            return cell;
          })}
        </div>
      );
    });
  };

  return <div className={styles.background}>{generateGrid()}</div>;
};

export default Grid;
