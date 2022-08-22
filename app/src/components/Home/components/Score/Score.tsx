import React from "react";

const Score: React.FC<{ gameStatus: string }> = (props) => {
  return <div>{props.gameStatus ? props.gameStatus : null}</div>;
};

export default Score;
