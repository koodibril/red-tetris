import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useTetris, useTetrisActions } from "src/ducks/tetris/actions/tetris";
import { socket } from "src/hooks/useSocket";

const Username: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const { joinRoom } = useTetrisActions();
  const { room } = useTetris();
  const handleSubmit = (formData: { Username: string }) => {
    joinRoom(socket, room, formData.Username);
    props.setVisible(false);
  };
  return (
    <>
      <Modal
        title="New Player in Room"
        visible={props.visible}
        closable={false}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="Username"
            rules={[
              {
                required: true,
                min: 3,
              },
            ]}
          >
            <Input placeholder="Enter your username"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Play
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Username;
