import React, { useMemo } from "react";
import styles from "./Grid.module.css";

const Grid: React.FC<{
  grid: any;
  cellSize: string;
  borderSize: string;
  padding: string;
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
                    minHeight:
                      rIndex === 0 || rIndex === 21
                        ? props.borderSize
                        : props.cellSize,
                    minWidth:
                      cIndex === 0 || cIndex === 11
                        ? props.borderSize
                        : props.cellSize,
                  }}
                  key={cIndex}
                ></div>
              ) : cas.value === 0 ? (
                <div
                  className={styles.air}
                  style={{
                    minHeight: props.cellSize,
                    minWidth: props.cellSize,
                  }}
                  key={cIndex}
                ></div>
              ) : (
                <div
                  className={styles.cell}
                  style={{
                    backgroundColor: cas.color,
                    borderColor: cas.color,
                    opacity: cas.value === 2 || cas.value === 3 ? 1 : 0.5,
                    minHeight: props.cellSize,
                    minWidth: props.cellSize,
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

  return (
    <div
      className={styles.background}
      style={{
        paddingTop: props.padding,
        paddingLeft: props.padding,
        paddingBottom: props.padding,
      }}
    >
      {generateGrid()}
    </div>
  );
};

export default Grid;
