import { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { draftJsCreateContent } from './utilities/draft-converter.util';
import { entityMapper, customChunkRenderer } from './utilities/custom-table-renderer.util';

const useEditorField = ({ name }) => {
  const { initialValues, setFieldValue, setFieldTouched } = useFormikContext();

  const [editorState, setEditorState] = useState(draftJsCreateContent(initialValues[name]));
  const [editorHTML, setEditorHTML] = useState('');
  const [isShowEditorCode, setIsShowEditorCode] = useState(false);

  useEffect(() => {
    setFieldValue(name, initialValues[name], true);
    initialValuesEditor(initialValues[name]);
    addInitialValuesToEditor();
  }, [initialValues]);

  const initialValuesEditor = (value) => {
    return setEditorState(draftJsCreateContent(value));
  };

  const onChange = (value) => {
    setFieldValue(name, draftToHtml(value, null, false, entityMapper), true);
  };

  const onEditorStateChange = (value) => {
    const editorDraftHTML = draftToHtml(
      convertToRaw(value.getCurrentContent()),
      null,
      false,
      entityMapper
    );
    setFieldValue(name, editorDraftHTML, true);
    setEditorState(value);
    setEditorHTML(editorDraftHTML);
  };

  const handleAddContentToEditor = (content) => {
    const convertedContentHTML = htmlToDraft(content, customChunkRenderer);
    const contentState = ContentState.createFromBlockArray(convertedContentHTML.contentBlocks);
    const editor = EditorState.createWithContent(contentState);
    onEditorStateChange(editor);
  };

  const addInitialValuesToEditor = () => {
    handleAddContentToEditor(initialValues[name]);
  };

  const onEditEditorHTML = (event) => {
    const editorValue = event.target.value;
    handleAddContentToEditor(editorValue);
    setEditorHTML(editorValue);
  };

  const onBlur = () => {
    setFieldTouched(name, true, true);
  };

  const toggleEditorCode = () => {
    if (!isShowEditorCode) {
      onEditorStateChange(editorState);
    }
    setIsShowEditorCode((prev) => !prev);
  };

  return {
    editorState,
    setEditorState,
    onEditorStateChange,
    onBlur,
    onChange,
    toggleEditorCode,
    isShowEditorCode,
    editorHTML,
    onEditEditorHTML
  };
};

export default useEditorField;
