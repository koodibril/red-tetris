import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "src/ducks/tetris/actions/tetris";
import { socket } from "src/hooks/useSocket";

const Oponents: React.FC = () => {
  const { listenToOponents } = useTetrisActions();
  const { oponents } = useTetris();
  useEffect(() => {
    listenToOponents(socket);
    return () => {
      socket.off("oponents");
    };
  }, []);
  console.log(oponents);
  return <></>;
};

export default Oponents;
