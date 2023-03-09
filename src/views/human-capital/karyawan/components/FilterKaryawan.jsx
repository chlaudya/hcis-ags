import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search } from '@material-ui/icons';
import { Button, Col, Row } from 'reactstrap';
import { SearchFilter } from 'ui-component/tableFilters';
import { getKaryawanBySearch, getKaryawanList } from 'store/actions/karyawan';

const FilterKaryawan = ({ params }) => {
  const dispatch = useDispatch();
  const [searchNip, setSearchNip] = useState();
  const [searchUnitBisnis, setSearchUnitBisnis] = useState();

  const onSearchNip = (value) => {
    setSearchNip(value);
  };

  const onSearchUnitBisnis = (value) => {
    setSearchUnitBisnis(value);
  };

  const onClickSearch = () => {
    dispatch(getKaryawanBySearch(params, { karyawanNip: searchNip, unitName: searchUnitBisnis }));
  };

  const onClickReset = () => {
    dispatch(getKaryawanList(params));
  };

  return (
    <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-4">
      <Col md="4">
        <SearchFilter
          placeholder="NIP"
          id="TxtSearchValue"
          value={searchNip}
          onChange={onSearchNip}
        />
      </Col>
      <Col md="4">
        <SearchFilter
          placeholder="Unit Bisnis"
          id="TxtSearchValue"
          value={searchUnitBisnis}
          onChange={onSearchUnitBisnis}
        />
      </Col>
      <Col md="4" className="align-self-center">
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

export default FilterKaryawan;