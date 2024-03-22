/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Print, Search } from '@material-ui/icons';
import { Button, Col, Row } from 'reactstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import DatePicker from 'react-datepicker';
import { Label, Input } from 'reactstrap';
import { SearchFilter, DropdownFilter } from 'src/ui-component/tableFilters';
import { getStateMasterUnitBisnis, getStateReportSuratPeringatan } from 'store/stateSelector';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import {
  getAllReportSuratPeringatan,
  getReportSuratPeringatan
} from 'store/actions/report-surat-peringatan';
import { formattedPeriod, renderDate } from 'utils/renderDate';
import TableExcelTagihanGaji from './components/TableExcelSuratPeringatan';

const FilterSuratPeringatan = ({ params, reportData, loadingData }) => {
  const dispatch = useDispatch();
  const { reportAllSuratPeringatan, loadingGetAll } = useSelector(getStateReportSuratPeringatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const [searchName, setSearchName] = useState('');
  const [searchPeriod, setSearchPeriod] = useState('');
  const [searchUnitBisnis, setSearchUnitBisnis] = useState('');
  const [unitBisnis, setUnitBisnis] = useState('');
  const [searchParams, setSearchParams] = useState({ ...params });
  const [isFilteredTagihan, setIsFilteredTagihan] = useState(false);
  const tableRefTagihan = useRef(null);

  useEffect(() => {
    dispatch(getDropdownUnitBisnis());
  }, []);

  useEffect(() => {
    handleRenderUnitBisnis();
  }, [searchUnitBisnis]);

  const handleRenderUnitBisnis = () => {
    const unitBisnis = dropdownUnitBisnis?.find((item) => item.value === searchUnitBisnis);

    if (unitBisnis) setUnitBisnis(unitBisnis?.label);
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

  const onSearchPeriod = (value) => {
    setSearchPeriod(value);
    setSearchParams({
      ...searchParams,
      periode: formattedPeriod(value)
    });
  };

  const onClickSearch = () => {
    dispatch(getReportSuratPeringatan(searchParams));
    setIsFilteredTagihan(!isFilteredTagihan);
  };

  const onClickReset = () => {
    setSearchName('');
    setSearchPeriod('');
    setSearchUnitBisnis('');
    setSearchParams({ ...params });
    dispatch(getReportSuratPeringatan(params));
    setIsFilteredTagihan(!isFilteredTagihan);
  };

  const dateToday = renderDate(new Date());

  const InputDate = ({ onChange, value, id, onClick }) => (
    <Input id={id} placeholder="Select" onChange={onChange} value={value} onClick={onClick} />
  );

  useEffect(() => {
    dispatch(
      getAllReportSuratPeringatan({
        ...searchParams,
        page: 1,
        size: reportData?.total_record
      })
    );
  }, [reportData?.total_record]);

  return (
    <>
      <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-1">
        <Col md="4">
          <SearchFilter
            label="Name :"
            placeholder="Name"
            id="TxtSearchName"
            value={searchName}
            onChange={onSearchName}
          />
        </Col>
        <Col md="4">
          <Label for="TxtDatePeriod" className="fw-bold">
            Period :
          </Label>
          <DatePicker
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
        <Col md="4">
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
      </Row>
      <Row className="mt-3 mb-4">
        <Col className="text-center">
          <Button
            outline
            color="primary"
            className="me-2"
            onClick={onClickSearch}
            disabled={loadingData || loadingGetAll}
          >
            <Search /> Search
          </Button>
          <Button
            outline
            color="primary"
            className="me-2 p-2-2"
            onClick={onClickReset}
            disabled={loadingData || loadingGetAll}
          >
            Reset
          </Button>
          <Button
            color="primary"
            className="me-2 p-2-2"
            disabled={loadingData || loadingGetAll || reportAllSuratPeringatan?.length === 0}
          >
            <DownloadTableExcel
              filename={`report-sp-${dateToday}`}
              sheet={`report-sp-${dateToday}`}
              currentTableRef={tableRefTagihan.current}
            >
              <Print /> Report Surat Peringatan
            </DownloadTableExcel>
          </Button>
        </Col>
      </Row>
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
      <TableExcelTagihanGaji
        tableRef={tableRefTagihan}
        period={searchPeriod}
        dataTotalTagihan={reportAllSuratPeringatan}
        dataTagihanGaji={reportAllSuratPeringatan}
        isFiltered={isFilteredTagihan}
        unitBisnis={unitBisnis}
      />
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
    </>
  );
};

export default FilterSuratPeringatan;
