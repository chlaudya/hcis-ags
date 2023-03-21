const CustomToolbarEditorCode = ({ toggleEditorCode, isShowEditorCode }) => (
  <div className="rdw-option-wrapper" onClick={toggleEditorCode}>
    {isShowEditorCode ? 'Hide Code' : 'Show Code'}
  </div>
);

export default CustomToolbarEditorCode;
