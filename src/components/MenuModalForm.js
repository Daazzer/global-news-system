import React, { useMemo } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addPermission, setPermission } from '@/api/permissionList';

/**
 * 菜单详情模态框
 * @returns {React.ReactNode}
 */
function MenuModalForm({ state, open, data, form, onOk, onCancel }) {
  const title = useMemo(() => ({
    add: '添加菜单',
    addSub: `添加“${data.name}”子菜单`,
    edit: `修改“${data.name}”菜单`
  }[state]), [state, data]);

  const handleOk = async () => {
    const formData = await form.validateFields();
    if (state === 'edit') {
      await setPermission(data.id, formData)
    } else {
      await addPermission({
        ...formData,
        parentId: data?.id || 0
      });
    }
    message.success(`${state === 'add' ? '添加' : '修改'}权限成功`);
    onOk();
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

export default MenuModalForm;