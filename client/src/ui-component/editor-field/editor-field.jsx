import { Editor } from 'react-draft-wysiwyg';
import classNames from 'classnames';
import { useField } from 'formik';

import CustomToolbarEditorCode from './components/custom-toolbar-editor';
import useEditorField from './editor-field.hook';
import { customBlockRenderer } from './utilities/custom-table-renderer.util';

import { CUSTOM_TOOLBAR_MENU } from './editor-field.constant';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor-field.scss';
import { Form, Label } from 'reactstrap';

const EditorField = (props) => {
  const { className, helper, editorClassName, label, ...restProps } = props;

  const {
    editorState,
    onEditorStateChange,
    onChange,
    onBlur,
    toggleEditorCode,
    isShowEditorCode,
    editorHTML,
    onEditEditorHTML
  } = useEditorField(props);

  const cssClasses = classNames('EditorField', className);

  const editorClasses = classNames('EditorField-editor', editorClassName);

  const [_field, meta] = useField(props.name);

  const isFieldError = meta.error;
  const isFieldTouched = meta.touched;
  const isFieldDirty = isFieldError && isFieldTouched;

  const renderFieldHelper = ({ ...rest }) => {
    const hasHelperText = !!helper;
    if (isFieldDirty) {
      return <Label theme="danger">{meta.error}</Label>;
    } else if (!isFieldDirty && hasHelperText) {
      return helper({ rest });
    }
  };

  return (
    <Form className={cssClasses}>
      <Label className="Typography-bold16">{label}</Label>
      <Editor
        wrapperClassName="EditorField-wrapper"
        editorClassName={editorClasses}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={CUSTOM_TOOLBAR_MENU}
        onChange={onChange}
        onBlur={onBlur}
        stripPastedStyles={true}
        customBlockRenderFunc={customBlockRenderer}
        toolbarCustomButtons={[
          <CustomToolbarEditorCode
            toggleEditorCode={toggleEditorCode}
            isShowEditorCode={isShowEditorCode}
          />
        ]}
        {...restProps}
      />
      {isShowEditorCode && (
        <textarea
          rows={10}
          className="EditorField-editorHtml"
          value={editorHTML}
          onChange={onEditEditorHTML}
        />
      )}
      {renderFieldHelper({ props })}
    </Form>
  );
};

export default EditorField;
