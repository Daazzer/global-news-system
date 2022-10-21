import React, { useEffect, useMemo, useState } from 'react';
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
 * 获取选中的 keys
 * @param {object[]} tree 
 * @param {number[]} menuIds 
 * @returns {numebr[]}
 */
const getCheckedKeys = (tree, menuIds = []) => {
  const checkedKeys = [];
  /**
   * 判断当前节点下所有后代节点是否全选，如果不是，则返回 false
   * @param {object} node 
   * @returns {boolean}
   */
  const isSave = node => {
    const { children, key } = node;
    let result = menuIds.includes(key);
    const fn = tree => tree.every(node => {
      if (node?.children?.length) {
        return fn(node.children);
      } else {
        return menuIds.includes(node.key);
      }
    });
    if (children && children.length) {
      result = fn(children);
    }
    return result;
  };
  /**
   * 递归函数
   * @param {object[]} tree 
   */
  const fn = tree => {
    tree.forEach(node => {
      const { children, key } = node;

      if (isSave(node)) {
        checkedKeys.push(key);
      }

      if (node?.children?.length) {
        fn(children);
      }
    });
  };

  fn(tree);
  return checkedKeys;
};

/**
 * 菜单树模态框
 * @returns {React.ReactNode}
 */
function MenusModalTree({ open, data, onOk, onCancel, onCheck }) {
  const [treeData, setTreeData] = useState([]);
  const { menus } = useSelector(state => state.main);
  const checkedKeys = useMemo(() => getCheckedKeys(treeData, data.menus), [treeData, data]);

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
  }, [menus, data]);

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
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={treeData}
      />
    </Modal>
  );
}

export default MenusModalTree;