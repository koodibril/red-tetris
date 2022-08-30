import React, { useEffect, useState } from "react";

import { Layout, Typography } from "antd";

import Routes from "./App.route";

import styles from "./App.module.css";
import { socket } from "./hooks/useSocket";
import { useNavigation } from "./ducks/navigation/navigation";
import UserComponent from "./Home/components/Score/Username";
import FlyingComponent from "./Home/components/Score/Flying";
import { useTetris, useTetrisActions } from "./ducks/tetris/actions/tetris";

const { Content, Header } = Layout;

const App: React.FC = () => {
  const { room, name } = useTetris();
  const { listenToServer } = useTetrisActions();
  const { pushState } = useNavigation();
  const [modal, setModal] = useState(true);

  useEffect(() => {
    if (room && name) {
      pushState(`/${room}[${name}]`);
    }
  }, [room, name]);

  useEffect(() => {
    listenToServer(socket);
  }, []);

  return (
    <Layout>
      <Header>
        <Typography.Title style={{ color: "#aaaaaa" }}>
          RED-TETRIS
        </Typography.Title>
      </Header>
      <Content className={styles.content}>
        <FlyingComponent></FlyingComponent>
        <UserComponent visible={modal} setVisible={setModal}></UserComponent>
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
