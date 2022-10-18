import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addRole } from '@/api/roleList';

/**
 * 角色信息模态框表单
 * @returns {React.ReactNode}
 */
function RoleModalForm({ open, form, onOk, onCancel }) {
  const handleOk = async () => {
    const addFormData = await form.validateFields();
    await addRole(addFormData);
    message.success('添加角色成功');
    onOk();
    onCancel();
  };

  return (
    <Modal
      forceRender
      title="添加角色"
      okText="确定"
      cancelText="取消"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="addForm"
      >
        <Form.Item
          name="name"
          label="角色名称"
          rules={[
            {
              required: true,
              message: '角色名称不能为空'
            }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RoleModalForm;