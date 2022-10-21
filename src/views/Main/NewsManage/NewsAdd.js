import { useSelector } from 'react-redux';
import { Form, Input, PageHeader, Select } from 'antd';
import NewsEditor from '@/components/NewsEditor';

function NewsAdd({ meta }) {
  const [form] = Form.useForm();
  const { categories } = useSelector(state => state.main);
  const handleEditorStateChange = content => {
    form.setFieldValue('content', content)
    form.validateFields(['content']);
  };

  return (
    <div className="news-add">
      <PageHeader
        title={meta.name}
        subTitle="新增一条新闻"
      />
      <Form
        labelWrap
        layout="vertical"
        colon={false}
        form={form}
      >
        <Form.Item
          label="新闻标题"
          name="name"
          rules={[
            {
              required: true,
              message: '新闻标题不能为空'
            }
          ]}
        >
          <Input maxLength={120} />
        </Form.Item>
        <Form.Item
          label="新闻分类"
          name="categoryId"
          rules={[
            {
              required: true,
              message: '新闻分类不能为空'
            }
          ]}
        >
          <Select>
            {categories.map(category =>
              <Select.Option
                key={category.id}
                value={category.id}
              >{category.name}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="新闻内容"
          name="content"
          rules={[
            {
              required: true,
              message: '新闻内容不能为空'
            }
          ]}
        >
          <NewsEditor onEditorStateChange={handleEditorStateChange} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewsAdd;