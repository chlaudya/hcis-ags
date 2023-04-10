/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@material-ui/icons';
import { Button, Col, Row } from 'reactstrap';
import { SearchFilter, DropdownFilter } from 'src/ui-component/tableFilters';
import { getStateMasterUnitBisnis } from 'store/stateSelector';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getKontrakList } from 'store/actions/kontrak';

const FilterKontrak = ({ params }) => {
  const dispatch = useDispatch();
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const [searchNip, setSearchNip] = useState('');
  const [searchName, setSearchName] = useState('');
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

  const onSearchName = (value) => {
    setSearchName(value);
    setSearchParams({
      ...searchParams,
      karyawan_name: value
    });
  };

  const onSearchUnitBisnis = (value) => {
    setSearchUnitBisnis(value);
    setSearchParams({
      ...searchParams,
      unit_id: value
    });
  };

  const onClickSearch = () => {
    dispatch(getKontrakList(searchParams));
  };

  const onClickReset = () => {
    setSearchNip('');
    setSearchUnitBisnis('');
    setSearchParams({ ...params });
    dispatch(getKontrakList(params));
  };

  return (
    <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-4">
      <Col md="3">
        <SearchFilter
          placeholder="NIP"
          id="TxtSearchNip"
          value={searchNip}
          onChange={onSearchNip}
        />
      </Col>
      <Col md="3">
        <SearchFilter
          placeholder="Name"
          id="TxtSearchName"
          value={searchName}
          onChange={onSearchName}
        />
      </Col>
      <Col md="3">
        <DropdownFilter
          placeholder="Select Unit Bisnis"
          id="DrpSearchUnit"
          name="DropdownTypeAgent"
          value={searchUnitBisnis}
          options={dropdownUnitBisnis}
          onChange={onSearchUnitBisnis}
        />
      </Col>
      <Col md="3" className="align-self-center">
        <Button color="primary" className="me-2" onClick={onClickSearch}>
          <Search /> Search
        </Button>
        <Button outline color="primary" className="p-2-2" onClick={onClickReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default FilterKontrak;
