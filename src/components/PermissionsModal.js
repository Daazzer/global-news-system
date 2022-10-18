import React, { useEffect, useState } from 'react';
import { message, Modal, Tree } from 'antd';
import { getPermissions } from '@/api/user';
import { getAssembleTree } from '@/utils';
import { setRole } from '@/api/roleList';

const getTreeData = tree => {
  const fn = tree => tree.map(node => {
    const data = {
      key: node.id,
      title: node.name,
    };
    if (node?.children) {
      data.children = fn(node.children);
    }
    return data;
  });
  return fn(tree);
};

/**
 * 权限树模态框
 * @returns {React.ReactNode}
 */
function PermissionsModal({ open, data, onOk, onCancel, onCheck }) {
  const [treeData, setTreeData] = useState([]);

  const initTreeData = async () => {
    const res = await getPermissions();
    const allPermissions = res.data;
    const allPermissionsTree = getAssembleTree(allPermissions);
    const treeData = getTreeData(allPermissionsTree);
    setTreeData(treeData);
  };

  const handleOk = async () => {
    const { id, permissions } = data;
    await setRole(id, { permissions });
    message.success('权限分配成功');
    onOk();
  };

  useEffect(() => {
    initTreeData();
  }, []);

  return (
    <Modal
      title="权限分配"
      okText="确定"
      cancelText="取消"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Tree
        checkable
        checkedKeys={data.permissions}
        onCheck={onCheck}
        treeData={treeData}
      />
    </Modal>
  );
}

export default PermissionsModal;