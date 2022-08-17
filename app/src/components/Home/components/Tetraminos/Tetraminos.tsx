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
} from "src/utils/utils";

const Tetraminos: React.FC<{ tetra: any; control: any }> = (props) => {
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
