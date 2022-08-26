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
            const cell =
              cIndex === 0 || cIndex === 11 || rIndex === 0 || rIndex === 21 ? (
                <div
                  className={styles.brick}
                  style={{
                    minHeight: rIndex === 0 || rIndex === 21 ? "10px" : "35px",
                    minWidth: cIndex === 0 || cIndex === 11 ? "10px" : "35px",
                  }}
                  key={cIndex}
                ></div>
              ) : cas.value === 0 ? (
                <div className={styles.air} key={cIndex}></div>
              ) : (
                <div
                  className={styles.cell}
                  style={{
                    backgroundColor: cas.color,
                    borderColor: cas.color,
                    opacity: cas.value === 2 || cas.value === 3 ? 1 : 0.5,
                  }}
                  key={cIndex}
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
