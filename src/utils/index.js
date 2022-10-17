/**
 * 组装扁平化树形数据
 * @param {object[]} data 数据源
 * @param {string} [id="id"] id 字段名
 * @param {string} [parentId="parentId"] 父节点字段名
 * @param {string} [children="children"] 子节点字段名
 * @param {number} [rootId=0] 根 id
 * @returns {object[]} 组装后的树形数据
 */
export function getAssembleTree(
  data,
  id = 'id',
  parentId = 'parentId',
  children = 'children',
  rootId = 0
) {
  data = Array.isArray(data) ? data : [];
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  // 循环所有项
  const treeData = cloneData.filter(father => {
    // 返回每一项的子级数组
    const branchArr = cloneData.filter(child => father[id] === child[parentId]);

    if (branchArr.length) {
      father[children] = branchArr;
    }

    // 返回第一层
    return father[parentId] === rootId;
  });

  return treeData?.length ? treeData : data;
}

/**
 * 翻译枚举值
 * @template ValueType 传入的枚举值类型
 * @param {ValueType} value 实际值
 * @param {{ label: string; value: ValueType }[]} options 枚举选项
 * @returns {string}
 */
export function getOptionsLabel(value, options) {
  const option = options.find(option => option.value === value);
  return option?.label || '';
}
