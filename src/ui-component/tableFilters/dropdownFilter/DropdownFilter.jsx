import React from 'react';
import ReactSelect from 'react-select';
import { Form, Label } from 'reactstrap';

const DropdownFilter = ({
  id,
  className,
  label,
  value,
  options,
  onChange,
  name,
  ...restProps
}) => {
  const handleChange = (event) => {
    onChange(event.value);
  };

  const setValue = options?.filter((option) => option.value === value);

  return (
    <Form className={className} data-testid='dropdown-filter'>
      {!!label && (
        <Label for={id} className='text-bold-600'>
          {label}
        </Label>
      )}
      <ReactSelect
        {...restProps}
        inputId={id}
        options={options}
        value={setValue}
        name={name}
        onChange={handleChange}
      />
    </Form>
  );
};

export default DropdownFilter;
