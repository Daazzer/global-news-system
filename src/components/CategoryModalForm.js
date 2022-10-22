import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { addCategory } from '@/api/newsManage';

/**
 * 新闻分类模态框表单
 * @returns {React.ReactNode}
 */
function CategoryModalForm({ open, form, onOk, onCancel }) {
  const handleOk = async () => {
    const addFormData = await form.validateFields();
    await addCategory(addFormData);
    message.success('添加新闻分类成功');
    onOk();
  };

  return (
    <Modal
      forceRender
      title="添加新闻分类"
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
          label="新闻分类名"
          rules={[
            {
              required: true,
              message: '新闻分类名不能为空'
            }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryModalForm;