import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Form, message, Popconfirm, Input } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { setRegions } from '@/store/reducers/mainReducer';
import RegionModalForm from '@/components/RegionModalForm';
import { SystemDefault } from '@/utils/enums';
import { delRegion, setRegion } from '@/api/regionList';
import style from './RegionList.module.scss';

/**
 * 区域列表
 * @returns {React.ReactNode}
 */
function RegionList() {
  const dispatch = useDispatch();
  const [editRowId, setEditRowId] = useState(null);
  const [regionModalForm] = Form.useForm();
  const [regionForm] = Form.useForm();
  const [isRegionModalFormOpen, setIsRegionModalFormOpen] = useState(false);
  const { regions: dataSource } = useSelector(state => state.main);

  const handleUserModalFormOk = () => {
    setIsRegionModalFormOpen(false);
    dispatch(setRegions);
  };

  const handleEdit = row => {
    regionForm.setFieldsValue({ name: row.name });
    setEditRowId(row.id);
  };

  const handleSave = async row => {
    const { name } = await regionForm.validateFields();
    await setRegion(row.id, { name });
    message.success('设置区域名成功');
    setEditRowId(null);
    dispatch(setRegions);
  };

  const handleDel = async row => {
    await delRegion(row.id);
    message.success('删除区域成功');
    dispatch(setRegions);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '区域名',
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
                message: '区域名不能为空'
              }
            ]}
          >
            <Input maxLength={30} />
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
            title={`你确定要删除“${row.name}”区域吗？`}
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
    <div className={style.regionList}>
      <Button
        className="region-list__button"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsRegionModalFormOpen(true)}
      >添加区域</Button>
      <Form form={regionForm}>
        <Table
          rowClassName={() => 'editable-row'}
          pagination={{ pageSize: 5 }}
          rowKey={row => row.id}
          dataSource={dataSource}
          columns={columns}
        />
      </Form>
      <RegionModalForm
        open={isRegionModalFormOpen}
        form={regionModalForm}
        onOk={handleUserModalFormOk}
        onCancel={() => setIsRegionModalFormOpen(false)}
      />
    </div>
  );
}

export default RegionList;