import { useEffect, useState, useMemo } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { getRegions, getRoles } from '@/api/main';
import { Region, Role } from '@/utils/enums';

const { Option } = Select;

function UserModalForm({ form, title, open, onCancel, onOk }) {
  const [roles, setRoles] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [roleId, setRoleId] = useState(form.getFieldValue('roleId'));
  const disabledRegion = useMemo(() => roleId === Role.ADMIN, [roleId]);
  const regions = useMemo(() => allRegions.filter(region => roleId === Role.ADMIN
    ? region.value === Region.GLOBAL
    : region.value !== Region.GLOBAL
  ), [allRegions, roleId]);

  /** 初始化区域数据 */
  const initAllRegions = async () => {
    const res = await getRegions();
    const allRegions = res.data;
    setAllRegions(allRegions);
  };

  /** 初始化角色数据 */
  const initRoles = async () => {
    const res = await getRoles();
    const roles = res.data;
    setRoles(roles);
  };

  const handleRoleIdChange = value => {
    const isAdmin = value === Role.ADMIN;
    if (isAdmin) {
      form.setFieldValue('region', Region.GLOBAL);
    } else if (form.getFieldValue('region') === Region.GLOBAL) {
      form.setFieldValue('region', null);
    }
    setRoleId(value);
  };

  const handleModalOk = async () => {
    onOk();
  };

  useEffect(() => {
    initAllRegions();
    initRoles();
  }, []);

  return (
    <Modal
      forceRender
      title={title}
      open={open}
      onOk={handleModalOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
    >
      <Form
        form={form}
        layout="vertical"
        name="form"
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '用户名不能为空'
            }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '密码不能为空'
            }
          ]}
        >
          <Input type="password" maxLength={30} />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={[
            {
              required: true,
              message: '区域不能为空'
            }
          ]}
        >
          <Select disabled={disabledRegion}>
            {regions.map(region =>
              <Option
                key={region.id}
                value={region.value}
              >{region.label}</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: '角色不能为空'
            }
          ]}
        >
          <Select value={roleId} onChange={handleRoleIdChange}>
            {roles.map(role =>
              <Option
                key={role.id}
                value={role.id}
              >{role.name}</Option>
            )}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

UserModalForm.propTypes = {
  form: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func
};

export default UserModalForm;