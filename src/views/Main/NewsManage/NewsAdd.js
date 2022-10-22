import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button, Form, Input, Modal, notification, PageHeader, Select } from 'antd';
import NewsEditor from '@/components/NewsEditor';
import style from './NewsAdd.module.scss';
import { AuditState } from '@/utils/enums';
import { addNews, getNewsDetail, setNews } from '@/api/newsManage';

function NewsAdd({ meta }) {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { params, path } = routeMatch;
  const isEdit = path.includes('news-edit');
  const [form] = Form.useForm();
  const { categories } = useSelector(state => state.main);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState({});

  const handleEditorStateChange = content => {
    form.setFieldValue('content', content);
    form.validateFields(['content']);
  };

  const handleSubmitAudit = auditState => {
    Modal.confirm({
      style: { top: 260 },
      maskClosable: true,
      title: '警告',
      content: '是否提交审核？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => handleSave(auditState)
    });
  };

  const handleSave = async auditState => {
    const isEdit = routeMatch.path.includes('news-edit');
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
    const req = {
      ...formData,
      auditState
    };

    if (isEdit) {
      await setNews(data.id, req);
    } else {
      await addNews(req);
    }

    notification.success({
      message: `${successMessage}成功`,
      description: `您可以到${successDesc}查看新闻`,
      placement: 'bottomRight'
    });

    history.push(path);
  };

  const initFormData = useCallback(async () => {
    if (!isEdit) return;
    const res = await getNewsDetail(params.id);
    const { data } = res;
    const { title, categoryId, content } = data;
    const formData = {
      title,
      categoryId,
      content
    };
    form.setFieldsValue(formData);
    setContent(content);
    setTitle(title);
    setData(data);
  }, [form, isEdit, params.id]);

  useEffect(() => {
    initFormData();
  }, [initFormData]);

  return (
    <div className={style.newsAdd}>
      <PageHeader
        title={meta.name}
        subTitle={title}
        onBack={isEdit ? () => history.goBack() : null}
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
          <NewsEditor
            content={content}
            onEditorStateChange={handleEditorStateChange}
          />
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
          onClick={() => handleSubmitAudit(AuditState.AUDIT)}
        >提交审核</Button>
      </div>
    </div>
  );
}

export default NewsAdd;