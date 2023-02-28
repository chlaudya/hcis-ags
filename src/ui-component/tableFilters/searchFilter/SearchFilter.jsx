import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import './search-filter.scss';

const SearchFilter = ({
  className,
  id,
  label,
  placeholder,
  value,
  onChange,
  ...restProps
}) => {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const onInputChange = (event) => {
    setSearch(event.target.value);
    onChange(event.target.value);
  };

  const onSearch = () => {
    onChange(search);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={className}>
      {!!label && (
        <Label for={id} className='text-bold-600'>
          {label}
        </Label>
      )}
      <Input
        {...restProps}
        id={id}
        placeholder={placeholder}
        value={search}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        className='search-filter'
      />
    </div>
  );
};

export default SearchFilter;
