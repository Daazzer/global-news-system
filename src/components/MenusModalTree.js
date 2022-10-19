import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { message, Modal, Tree } from 'antd';
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
 * 菜单树模态框
 * @returns {React.ReactNode}
 */
function MenusModalTree({ open, data, onOk, onCancel, onCheck }) {
  const [treeData, setTreeData] = useState([]);
  const { menus } = useSelector(state => state.main);

  const handleOk = async () => {
    const { id, menus } = data;
    await setRole(id, { menus });
    message.success('菜单分配成功');
    onOk();
  };

  useEffect(() => {
    const menusTree = getAssembleTree(menus);
    const treeData = getTreeData(menusTree);
    setTreeData(treeData);
  }, [menus]);

  return (
    <Modal
      forceRender
      title="菜单分配"
      okText="确定"
      cancelText="取消"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Tree
        checkable
        checkedKeys={data.menus}
        onCheck={onCheck}
        treeData={treeData}
      />
    </Modal>
  );
}

export default MenusModalTree;