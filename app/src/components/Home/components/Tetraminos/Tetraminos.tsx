import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { Col, Row, Button } from "antd";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jwt-decode";

const Tetraminos: React.FC<{ tetra: any; control: any }> = (props) => {
  const matrixSizeLeft = (matrix: any) => {
    let matrixLength = 4;
    matrix.map((row: any, rIndex: number) => {
      let rowLength = 4;
      row.map((cell: any, cIndex: number) => {
        if (cell === 1 && cIndex < rowLength) {
          rowLength = cIndex;
        }
      });
      if (rowLength < matrixLength) {
        matrixLength = rowLength;
      }
    });
    return matrixLength;
  };
  const matrixSizeRight = (matrix: any) => {
    let matrixLength = 1;
    matrix.map((row: any, rIndex: number) => {
      let rowLength = 1;
      row.map((cell: any, cIndex: number) => {
        if (cell === 1 && cIndex > rowLength) {
          rowLength = cIndex;
        }
      });
      if (rowLength > matrixLength) {
        matrixLength = rowLength;
      }
    });
    return matrixLength;
  };
  const matrixSizeBottom = (matrix: any) => {
    let matrixLength = 1;
    matrix.map((row: any, rIndex: number) => {
      let rowLength = 1;
      row.map((cell: any, cIndex: number) => {
        if (cell === 1 && rIndex > rowLength) {
          rowLength = rIndex;
        }
      });
      if (rowLength > matrixLength) {
        matrixLength = rowLength;
      }
    });
    return matrixLength;
  };
  const rotateClockwise = (a: any) => {
    const n = a.length;
    for (let i = 0; i < n / 2; i++) {
      for (let j = i; j < n - i - 1; j++) {
        const tmp = a[i][j];
        a[i][j] = a[n - j - 1][i];
        a[n - j - 1][i] = a[n - i - 1][n - j - 1];
        a[n - i - 1][n - j - 1] = a[j][n - i - 1];
        a[j][n - i - 1] = tmp;
      }
    }
    return a;
  };
  const moveDown = (tetra: any) => {
    const newTetra = { ...tetra };
    if (newTetra.x + matrixSizeBottom(tetra.shape) + 1 < 21) {
      newTetra.x = newTetra.x + 1;
    }
    return newTetra;
  };
  const rotate = (tetra: any) => {
    const oldTetra = { ...tetra };
    oldTetra.shape = rotateClockwise(tetra.shape);
    if (oldTetra.y < 5 && oldTetra.y + matrixSizeLeft(oldTetra.shape) - 1 < 0) {
      oldTetra.y =
        oldTetra.y + -(oldTetra.y + matrixSizeLeft(oldTetra.shape) - 1);
    } else if (
      oldTetra.y > 5 &&
      oldTetra.y + matrixSizeRight(oldTetra.shape) + 1 > 11
    ) {
      oldTetra.y =
        oldTetra.y - (oldTetra.y + matrixSizeRight(oldTetra.shape) + 1 - 11);
    }
    return oldTetra;
  };
  const moveLeft = (tetra: any) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeLeft(tetra.shape) - 1 > 0) {
      newTetra.y = newTetra.y - 1;
    }
    return newTetra;
  };
  const moveRight = (tetra: any) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeRight(tetra.shape) + 1 < 11) {
      newTetra.y = newTetra.y + 1;
    }
    return newTetra;
  };
  const handleKeyPress = (e: any) => {
    e.preventDefault();
    const key = e.key;
    let newTetra;
    switch (key) {
      case "ArrowDown":
        newTetra = moveDown(props.tetra);
        break;
      case "ArrowUp":
        newTetra = rotate(props.tetra);
        break;
      case "ArrowLeft":
        newTetra = moveLeft(props.tetra);
        break;
      case "ArrowRight":
        newTetra = moveRight(props.tetra);
        break;
    }
    props.control(newTetra);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return <></>;
};

export default Tetraminos;
