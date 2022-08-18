import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { Col, Row, Button } from "antd";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jwt-decode";
import {
  matrixSizeBottom,
  matrixSizeLeft,
  matrixSizeRight,
  rotateClockwise,
  rotateCounterClockwise,
} from "src/utils/utils";

const Tetraminos: React.FC<{ tetra: any; control: any; grid: any }> = (
  props
) => {
  const checkMerge = (tetra: any) => {
    let touch = false;
    tetra.shape.map((row: any, rIndex: number) => {
      row.map((cell: any, cIndex: number) => {
        if (
          cell === 1 &&
          props.grid &&
          props.grid[tetra.x + rIndex][tetra.y + cIndex].value !== 0 &&
          props.grid[tetra.x + rIndex][tetra.y + cIndex].value !== 2
        ) {
          touch = true;
        }
      });
    });
    return touch;
  };
  const moveDown = (tetra: any) => {
    const newTetra = { ...tetra };
    if (newTetra.x + matrixSizeBottom(tetra.shape) + 1 < 21) {
      newTetra.x = newTetra.x + 1;
      if (checkMerge(newTetra)) {
        newTetra.x = newTetra.x - 1;
      }
    }
    return newTetra;
  };
  const rotate = (tetra: any) => {
    const oldTetra = { ...tetra };
    oldTetra.shape = rotateClockwise(tetra.shape);
    const sizeLeft = matrixSizeLeft(oldTetra.shape);
    const sizeRight = matrixSizeRight(oldTetra.shape);
    const sizeBottom = matrixSizeBottom(tetra.shape);
    if (oldTetra.y < 5 && oldTetra.y + sizeLeft - 1 < 0) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    } else if (oldTetra.y > 5 && oldTetra.y + sizeRight + 1 > 11) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    }
    if (oldTetra.x > 18 && oldTetra.x + sizeBottom + 1 > 21) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    }
    if (checkMerge(oldTetra)) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    }
    return oldTetra;
  };
  const moveLeft = (tetra: any) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeLeft(tetra.shape) - 1 > 0) {
      newTetra.y = newTetra.y - 1;
      if (checkMerge(newTetra)) {
        newTetra.y = newTetra.y + 1;
      }
    }
    return newTetra;
  };
  const moveRight = (tetra: any) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeRight(tetra.shape) + 1 < 11) {
      newTetra.y = newTetra.y + 1;
      if (checkMerge(newTetra)) {
        newTetra.y = newTetra.y - 1;
      }
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
        props.control(newTetra);
        break;
      case "ArrowUp":
        newTetra = rotate(props.tetra);
        props.control(newTetra);
        break;
      case "ArrowLeft":
        newTetra = moveLeft(props.tetra);
        props.control(newTetra);
        break;
      case "ArrowRight":
        newTetra = moveRight(props.tetra);
        props.control(newTetra);
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return <></>;
};

export default Tetraminos;
