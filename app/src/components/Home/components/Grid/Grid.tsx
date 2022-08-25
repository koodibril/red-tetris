import React, { useMemo } from "react";
import styles from "./Grid.module.css";

const Grid: React.FC<{
  grid: any;
}> = (props) => {
  const generateGrid = () => {
    return props.grid.map((el: any, rIndex: number) => {
      return (
        <div className={styles.row} key={rIndex}>
          {el.map((cas: any, cIndex: number) => {
            const cell = (
              <div
                className={styles.cell}
                style={{
                  backgroundColor: cas.color,
                  borderColor: cas.color,
                }}
                key={cIndex}
              >
                {cas.value}
              </div>
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
