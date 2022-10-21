import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import style from './index.module.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function NewsEditor({ onEditorStateChange }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const handleEditorStateChange = editorState => {
    const htmlStr = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const content = htmlStr.trim() === '<p></p>' ? '' : htmlStr;
    setEditorState(editorState);
    onEditorStateChange(content);
  };

  return (
    <Editor
      editorState={editorState}
      placeholder="请输入新闻内容"
      wrapperClassName={style.editorWrapper}
      editorClassName={style.editorContent}
      onEditorStateChange={handleEditorStateChange}
    />
  );
}

export default NewsEditor;