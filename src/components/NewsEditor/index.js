import { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import style from './index.module.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function NewsEditor({ onEditorStateChange, content }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorStateChange = editorState => {
    const htmlStr = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const content = htmlStr.trim() === '<p></p>' ? '' : htmlStr;
    setEditorState(editorState);
    onEditorStateChange(content);
  };

  useEffect(() => {
    const contentBlock = htmlToDraft(content || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [content]);

  return (
    <Editor
      placeholder="请输入新闻内容"
      editorState={editorState}
      wrapperClassName={style.editorWrapper}
      editorClassName={style.editorContent}
      onEditorStateChange={handleEditorStateChange}
    />
  );
}

export default NewsEditor;