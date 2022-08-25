import React, { useEffect, useMemo, useState } from "react";

import { message } from "antd";

import { Layout, Typography } from "antd";
import {
  useMessage,
  useMessageActions,
} from "src/ducks/message/actions/message";

import Routes from "./App.route";

import styles from "./App.module.css";
import { socket } from "src/hooks/useSocket";
import { useNavigation } from "src/ducks/navigation/navigation";

const { Content, Header } = Layout;

const App: React.FC = () => {
  const messageState = useMessage();
  const { clearMessage } = useMessageActions();
  const { pushState } = useNavigation();

  useMemo(() => {
    if (messageState.status === "error") {
      message.error(messageState.value);
    } else if (messageState.status === "success") {
      message.success(messageState.value);
    } else if (messageState.status === "info") {
      message.info(messageState.value);
    }
    clearMessage();
  }, [message, messageState]);

  useEffect(() => {
    socket.on("connect", () => {
      const room = window.location.href.split("/")[3].split("[")[0];
      if (room) {
        socket.emit("order:join", {
          room: window.location.href.split("/")[3].split("[")[0].slice(1),
          name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
          tetraminos: undefined,
        });
      } else {
        socket.on("room", (roomId: number) => {
          const user = localStorage.getItem("username");
          pushState("/" + roomId + "[" + (user ? user : "Unknown") + "]");
        });
      }
    });
  }, []);

  return (
    <Layout>
      <Header>
        <Typography.Title style={{ color: "#aaaaaa" }}>
          RED-TETRIS
        </Typography.Title>
      </Header>
      <Content className={styles.content}>
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
