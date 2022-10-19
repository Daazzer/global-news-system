import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addRegion } from '@/api/regionList';

/**
 * 区域信息模态框表单
 * @returns {React.ReactNode}
 */
function RegionModalForm({ open, form, onOk, onCancel }) {
  const handleOk = async () => {
    const addFormData = await form.validateFields();
    await addRegion(addFormData);
    message.success('添加区域成功');
    onOk();
  };

  return (
    <Modal
      forceRender
      title="添加区域"
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
          label="区域名称"
          rules={[
            {
              required: true,
              message: '区域名称不能为空'
            }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RegionModalForm;