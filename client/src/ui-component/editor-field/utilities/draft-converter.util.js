import { EditorState, ContentState, convertFromHTML } from 'draft-js';

export const draftJsCreateContent = (value) => {
  if (typeof value !== 'string') return null;
  return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(value)));
};
