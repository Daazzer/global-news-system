import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, notification, PageHeader, Select } from 'antd';
import NewsEditor from '@/components/NewsEditor';
import style from './NewsAdd.module.scss';
import { AuditState } from '@/utils/enums';
import { addNews } from '@/api/newsManage';

function NewsAdd({ meta }) {
  const history = useHistory();
  const [form] = Form.useForm();
  const { categories } = useSelector(state => state.main);
  const [title, setTitle] = useState('');

  const handleEditorStateChange = content => {
    form.setFieldValue('content', content)
    form.validateFields(['content']);
  };

  const handleSave = async auditState => {
    const successMessage = {
      [AuditState.UNAUDITED]: '保存草稿',
      [AuditState.AUDIT]: '提交审核'
    }[auditState];
    const successDesc = {
      [AuditState.UNAUDITED]: '草稿箱',
      [AuditState.AUDIT]: '提交审核'
    }[auditState];
    const path = {
      [AuditState.UNAUDITED]: '/news-manage/draft',
      [AuditState.AUDIT]: '/audit-manage/audit-news'
    }[auditState];
    const formData = await form.validateFields();

    await addNews({
      ...formData,
      auditState
    });

    notification.success({
      message: `${successMessage}成功`,
      description: `您可以到${successDesc}查看新闻`,
      placement: 'bottomRight'
    });

    history.push(path);
  };

  return (
    <div className={style.newsAdd}>
      <PageHeader
        title={meta.name}
        subTitle={title}
      />
      <Form
        className="news-form"
        labelWrap
        layout="vertical"
        colon={false}
        form={form}
      >
        <Form.Item
          label="新闻标题"
          name="title"
          rules={[
            {
              required: true,
              message: '新闻标题不能为空'
            }
          ]}
        >
          <Input
            maxLength={120}
            onChange={e => setTitle(e.target.value)}
          />
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
      <div className="button-bar">
        <Button
          className="button-bar__button"
          type="primary"
          onClick={() => handleSave(AuditState.UNAUDITED)}
        >保存草稿</Button>
        <Button
          danger
          className="button-bar__button"
          onClick={() => handleSave(AuditState.AUDIT)}
        >提交审核</Button>
      </div>
    </div>
  );
}

export default NewsAdd;