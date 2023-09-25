import React from 'react';

const FormControl = (props) => {
  const {
    tag: Tag = 'div',
    className,
    children,
    isFieldDirty,
    onChange,
    onBlur,
    value,
    ...restProps
  } = props;

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: isFieldDirty ? '#ec0000' : '#ddd'
    })
  };

  return (
    <Tag
      {...restProps}
      className={className}
      invalid={isFieldDirty}
      styles={customStyles}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    >
      {children}
    </Tag>
  );
};

export default FormControl;
