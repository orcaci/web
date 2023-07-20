import { Button, Form, Input, Modal } from "antd";
import "./style.css";

interface ModalProps {
  isModalOpen: boolean;
  isLoading: boolean;
  onClose: Function;
  onOk: Function;
  modelFor: string;
}

export const CreateModal = (props: ModalProps) => {
  const { isModalOpen, onClose, onOk, isLoading, modelFor } = props;
  const createTitle = `Create ${modelFor}`;

  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(async () => {
        await onOk(form.getFieldsValue());
        onClose();
      })
      .catch((errors) => {
        console.log("ERROR IN FORM");
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title={createTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button loading={isLoading} type="primary" onClick={handleOk}>
            Create
          </Button>
        }
      >
        <div className="newForm">
          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              label="Name"
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true }]}
              label="Description"
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
