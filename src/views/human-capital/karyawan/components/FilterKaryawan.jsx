import { IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
// import { DropdownFilter } from 'components/agency/tableFilters';
// import { OPTIONS_PRODUCT, OPTIONS_REQUEST_TYPE, OPTIONS_STRUCTURE_TYPE } from 'constants/productConstants';
import { DropdownFilter, SearchFilter } from 'ui-component/tableFilters';

const FilterKaryawan = ({
  filterParams,
  onChangeProduct,
  onChangeRequestType,
  onChangeStructureType,
  onClickSearchButton,
  onClickResetButton
}) => {
  const [searchNip, setSearchNip] = useState();
  const [searchUnitBisnis, setSearchUnitBisnis] = useState();

  const onSearchNip = (value) => {
    setSearchNip(value);
  };

  const onSearchUnitBisnis = (value) => {
    setSearchUnitBisnis(value);
  };

  return (
    <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-4">
      <Col md="4">
        <SearchFilter placeholder="NIP" id="TxtSearchValue" value={searchNip} onChange={onSearchNip} />
      </Col>
      <Col md="4">
        <SearchFilter placeholder="Unit Bisnis" id="TxtSearchValue" value={searchUnitBisnis} onChange={onSearchUnitBisnis} />
      </Col>
      <Col md="4" className="align-self-center">
        <Button color="primary" className="me-2" onClick={onClickSearchButton}>
          <Search /> Search
        </Button>
        <Button outline color="primary" className="p-2-2" onClick={onClickResetButton}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default FilterKaryawan;
