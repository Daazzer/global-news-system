import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Form, message, Popconfirm, Input } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { setCategories } from '@/store/reducers/mainReducer';
import CategoryModalForm from '@/components/CategoryModalForm';
import { SystemDefault } from '@/utils/enums';
import { delCategory, setCategory } from '@/api/newsManage';
import style from './NewsCategory.module.scss';

/**
 * 新闻分类列表
 * @returns {React.ReactNode}
 */
function NewsCategory() {
  const dispatch = useDispatch();
  const nameInputRef = useRef(null);
  const { categories: dataSource } = useSelector(state => state.main);
  const [categoryModalForm] = Form.useForm();
  const [regionForm] = Form.useForm();
  const [editRowId, setEditRowId] = useState(null);
  const [isCategoryModalFormOpen, setIsCategoryModalFormOpen] = useState(false);

  const handleCategoryModalFormOpen = () => {
    categoryModalForm.setFieldsValue({ name: undefined });
    setIsCategoryModalFormOpen(true);
  };
  
  const handleCategoryModalFormOk = () => {
    setIsCategoryModalFormOpen(false);
    dispatch(setCategories);
  };

  const handleEdit = row => {
    regionForm.setFieldsValue({ name: row.name });
    setEditRowId(row.id);
    setTimeout(() => nameInputRef.current.focus());
  };

  const handleSave = async row => {
    const { name } = await regionForm.validateFields();
    await setCategory(row.id, { name });
    message.success('修改分类名成功');
    setEditRowId(null);
    dispatch(setCategories);
  };

  const handleDel = async row => {
    await delCategory(row.id);
    message.success('删除分类成功');
    dispatch(setCategories);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '新闻分类名 (点击单元格编辑)',
      dataIndex: 'name',
      key: 'name',
      render: (value, row) => (
        editRowId === row.id
          ? <Form.Item
            name="name"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: '新闻分类名不能为空'
              }
            ]}
          >
            <Input ref={nameInputRef} maxLength={30} />
          </Form.Item>
          : <div className="editable-cell" onClick={() => handleEdit(row)}>{value}</div>
      )
    },
    {
      title: '操作',
      key: 'option',
      render: row => (
        <div className={style.option}>
          {editRowId === row.id && <Button
            className="option__button"
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            onClick={() => handleSave(row)}
          />}
          {editRowId === row.id && <Button
            className="option__button"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => setEditRowId(null)}
          />}
          {editRowId !== row.id && <Popconfirm
            title={`你确定要删除“${row.name}”分类吗？`}
            onConfirm={() => handleDel(row)}
            okText="确定"
            cancelText="取消"
            disabled={row.default === SystemDefault.YES}
          >
            <Button
              danger
              className="option__button"
              type="primary"
              shape="circle"
              disabled={row.default === SystemDefault.YES}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>}
        </div>
      )
    }
  ];

  return (
    <div className={style.newsCategory}>
      <Button
        className="news-category__button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCategoryModalFormOpen}
      >添加新闻分类</Button>
      <Form form={regionForm}>
        <Table
          pagination={{ pageSize: 5 }}
          rowKey={row => row.id}
          dataSource={dataSource}
          columns={columns}
        />
      </Form>
      <CategoryModalForm
        open={isCategoryModalFormOpen}
        form={categoryModalForm}
        onOk={handleCategoryModalFormOk}
        onCancel={() => setIsCategoryModalFormOpen(false)}
      />
    </div>
  );
}

export default NewsCategory;