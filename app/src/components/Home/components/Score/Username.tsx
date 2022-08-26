import { Button, Col, Form, Input, Modal } from "antd";
import React from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { socket } from "src/hooks/useSocket";

const Username: React.FC<{ visible: boolean; setVisible: any }> = (props) => {
  const { pushState } = useNavigation();
  const handleSubmit = (formData: { Username: string }) => {
    localStorage.setItem("username", formData.Username);
    const room = window.location.href.split("/")[3].split("[")[0];
    socket.emit("order:join", {
      room: room,
      name: formData.Username,
      tetraminos: undefined,
    });
    pushState("/" + room + "[" + formData.Username + "]");
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
