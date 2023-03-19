import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@material-ui/icons';
import { Button, Col, Row } from 'reactstrap';
import { SearchFilter, DropdownFilter } from 'src/ui-component/tableFilters';
import { getKaryawanBySearch, getKaryawanList } from 'store/actions/karyawan';
import { getStateMasterUnitBisnis } from 'store/stateSelector';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';

const FilterKaryawan = ({ params }) => {
  const dispatch = useDispatch();
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const [searchNip, setSearchNip] = useState();
  const [searchUnitBisnis, setSearchUnitBisnis] = useState();

  useEffect(() => {
    dispatch(getDropdownUnitBisnis());
  }, []);

  const onSearchNip = (value) => {
    setSearchNip(value);
  };

  const onSearchUnitBisnis = (value) => {
    setSearchUnitBisnis(value);
  };

  const onClickSearch = () => {
    dispatch(getKaryawanList({ ...params, nip: searchNip, unit_id: searchUnitBisnis }));
  };

  const onClickReset = () => {
    setSearchNip('');
    setSearchUnitBisnis('');
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
        <DropdownFilter
          placeholder="Select Unit Bisnis"
          id="DrpSearchValue"
          name="DropdownTypeAgent"
          value={searchUnitBisnis}
          options={dropdownUnitBisnis}
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
