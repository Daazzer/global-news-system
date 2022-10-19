import React, { useMemo } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addRole } from '@/api/roleList';

/**
 * 权限信息模态框表单
 * @returns {React.ReactNode}
 */
function PermissionModalForm({ state, open, data, form, onOk, onCancel }) {
  const title = useMemo(() => ({
    add: '添加权限',
    addSub: `添加“${data.name}”子权限`,
    edit: `修改“${data.name}”权限`
  }[state]), [state]);

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
      okText="确定"
      cancelText="取消"
      title={title}
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
          label="权限名称"
          rules={[
            {
              required: true,
              message: '角色名称不能为空'
            }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item
          name="key"
          label="权限标识"
          rules={[
            {
              required: true,
              message: '权限标识不能为空'
            }
          ]}
        >
          <Input maxLength={80} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PermissionModalForm;