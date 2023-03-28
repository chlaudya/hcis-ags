/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@material-ui/icons';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { SearchFilter, DropdownFilter } from 'src/ui-component/tableFilters';
import { getStateMasterUnitBisnis } from 'store/stateSelector';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getGenerateSlipGaji } from 'store/actions/slip-gaji';
import ReactDatePicker from 'react-datepicker';
import { formattedPeriod } from 'utils/renderDate';

const FilterSlipGaji = ({ params }) => {
  const dispatch = useDispatch();
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const [searchNip, setSearchNip] = useState('');
  const [searchPeriod, setSearchPeriod] = useState('');
  const [searchUnitBisnis, setSearchUnitBisnis] = useState('');
  const [searchParams, setSearchParams] = useState({ ...params });

  useEffect(() => {
    dispatch(getDropdownUnitBisnis());
  }, []);

  const onSearchNip = (value) => {
    setSearchNip(value);
    setSearchParams({
      ...searchParams,
      nip: value
    });
  };

  const onSearchUnitBisnis = (value) => {
    setSearchUnitBisnis(value);
    setSearchParams({
      ...searchParams,
      unit_id: value
    });
  };

  const onSearchPeriod = (value) => {
    setSearchPeriod(value);
    setSearchParams({
      ...searchParams,
      periode: formattedPeriod(value)
    });
  };

  const onClickSearch = () => {
    dispatch(getGenerateSlipGaji(searchParams));
  };

  const onClickReset = () => {
    setSearchNip('');
    setSearchPeriod('');
    setSearchUnitBisnis('');
    setSearchParams({ ...params });
    dispatch(getGenerateSlipGaji(params));
  };

  const InputDate = ({ onChange, value, id, onClick }) => (
    <Input id={id} placeholder="Select" onChange={onChange} value={value} onClick={onClick} />
  );

  return (
    <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-5">
      <Col md="3">
        <Label for="TxtDatePeriod" className="fw-bold">
          Period :
        </Label>
        <ReactDatePicker
          customInput={<InputDate />}
          className="input"
          id="TxtDatePeriod"
          selected={searchPeriod}
          onChange={onSearchPeriod}
          dateFormat="MM/yyyy"
          maxDate={new Date()}
          showMonthYearPicker
          showIcon
        />
      </Col>
      <Col md="3">
        <SearchFilter
          label="NIP :"
          placeholder="NIP"
          id="TxtSearchValue"
          value={searchNip}
          onChange={onSearchNip}
        />
      </Col>
      <Col md="3">
        <DropdownFilter
          label="Unit Bisnis :"
          placeholder="Select Unit Bisnis"
          id="DrpUnitBisnis"
          name="DropdownTypeAgent"
          value={searchUnitBisnis}
          options={dropdownUnitBisnis}
          onChange={onSearchUnitBisnis}
        />
      </Col>
      <Col md="3" className="align-self-end">
        <Button color="primary" className="me-1" onClick={onClickSearch}>
          <Search /> Search
        </Button>
        <Button outline color="primary" className="p-2-2" onClick={onClickReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default FilterSlipGaji;
