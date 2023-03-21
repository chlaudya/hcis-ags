import classNames from 'classnames';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import EditorField from 'src/ui-component/editor-field/editor-field';
import { draftJsCreateContent } from 'src/ui-component/editor-field/utilities/draft-converter.util';
import MainCard from 'src/ui-component/cards/MainCard';
import htmlToDraft from 'html-to-draftjs';
import {
  entityMapper,
  customChunkRenderer
} from 'src/ui-component/editor-field/utilities/custom-table-renderer.util';

const Template = () => {
  const [editorState, setEditorState] = useState(draftJsCreateContent());
  const [editorHTML, setEditorHTML] = useState('');

  const onEditorStateChange = (value) => {
    const editorDraftHTML = draftToHtml(
      convertToRaw(value.getCurrentContent()),
      null,
      false
      // entityMapper
    );
    // setFieldValue(name, editorDraftHTML, true);
    setEditorState(value);
    console.log('editorDraftHTML', editorDraftHTML);
    // setEditorHTML(editorDraftHTML);
  };

  const handleAddContentToEditor = (content) => {
    const convertedContentHTML = htmlToDraft(content, customChunkRenderer);
    const contentState = ContentState.createFromBlockArray(convertedContentHTML.contentBlocks);
    const editor = EditorState.createWithContent(contentState);
    onEditorStateChange(editor);
  };

  const onEditEditorHTML = (event) => {
    const editorValue = event.target.value;
    handleAddContentToEditor(editorValue);
    setEditorHTML(editorValue);
  };

  const onChange = (value) => {
    setEditorHTML(draftToHtml(value, null, false, entityMapper), true);
  };

  console.log(editorState);
  const cssClasses = classNames('EditorField');

  const editorClasses = classNames('EditorField-editor');
  return (
    <MainCard title="Template PKWT">
      <Editor
        wrapperClassName="EditorField-wrapper"
        editorClassName={editorClasses}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        // toolbar={CUSTOM_TOOLBAR_MENU}
        onChange={onChange}
        // onBlur={onBlur}
        stripPastedStyles={true}
        // customBlockRenderFunc={customBlockRenderer}
        // toolbarCustomButtons={[
        //   <CustomToolbarEditorCode
        //     toggleEditorCode={toggleEditorCode}
        //     isShowEditorCode={isShowEditorCode}
        //   />
        // ]}
        // {...restProps}
      />
    </MainCard>
  );
};

export default Template;
