import React, { useMemo } from "react";
import styles from "./Grid.module.css";

const Grid: React.FC<{
  grid: any;
}> = (props) => {
  const generateGrid = () => {
    return props.grid.map((el: any) => {
      return (
        <div className={styles.row} key={el[0].x}>
          {el.map((cas: any) => {
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
