/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Print, Search } from '@material-ui/icons';
import { Button, Col, Row } from 'reactstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import DatePicker from 'react-datepicker';
import { Label, Input } from 'reactstrap';
import { SearchFilter, DropdownFilter } from 'src/ui-component/tableFilters';
import { getStateMasterUnitBisnis, getStateReport } from 'store/stateSelector';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getAllReportTagihanGaji, getReportTagihanGaji } from 'store/actions/report/reportAction';
import { formattedPeriod, renderDate } from 'utils/renderDate';
import TableExcelTagihanGaji from './components/TableExcelTagihanGaji';
import TableExcelRekapGaji from './components/TableExcelRekapGaji';

const FilterTagihanGaji = ({ params, reportData, loadingData }) => {
  const dispatch = useDispatch();
  const { reportAllTagihanGaji, loadingGetAll: loadingGetAllReportList } =
    useSelector(getStateReport);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  // const [reportDataGenerate, setReportDataGenerate] = useState([]);
  const [searchNip, setSearchNip] = useState('');
  const [searchPeriod, setSearchPeriod] = useState('');
  const [searchUnitBisnis, setSearchUnitBisnis] = useState('');
  const [unitBisnis, setUnitBisnis] = useState('');
  const [searchParams, setSearchParams] = useState({ ...params });
  const [isFilteredTagihan, setIsFilteredTagihan] = useState(false);
  const tableRefTagihan = useRef(null);
  const tableRefRekap = useRef(null);

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
    dispatch(getReportTagihanGaji(searchParams));
    setIsFilteredTagihan(!isFilteredTagihan);
  };

  const onClickReset = () => {
    setSearchNip('');
    setSearchPeriod('');
    setSearchUnitBisnis('');
    setSearchParams({ ...params });
    dispatch(getReportTagihanGaji(params));
    setIsFilteredTagihan(!isFilteredTagihan);
  };

  const dateToday = renderDate(new Date());

  const InputDate = ({ onChange, value, id, onClick }) => (
    <Input id={id} placeholder="Select" onChange={onChange} value={value} onClick={onClick} />
  );

  useEffect(() => {
    dispatch(
      getAllReportTagihanGaji({
        ...searchParams,
        page: 1,
        size: reportData?.total_record
      })
    );
  }, [reportData?.total_record, searchParams]);

  return (
    <>
      <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-1">
        <Col md="4">
          <SearchFilter
            label="NIP :"
            placeholder="NIP"
            id="TxtSearchValue"
            value={searchNip}
            onChange={onSearchNip}
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
            disabled={loadingData || loadingGetAllReportList}
          >
            <Search /> Search
          </Button>
          <Button
            outline
            color="primary"
            className="me-2 p-2-2"
            onClick={onClickReset}
            disabled={loadingData || loadingGetAllReportList}
          >
            Reset
          </Button>
          <Button
            color="primary"
            className="me-2 p-2-2"
            disabled={loadingData || loadingGetAllReportList}
          >
            <DownloadTableExcel
              filename={`tagihan-gaji_${dateToday}`}
              sheet={`tagihan-gaji-${dateToday}`}
              currentTableRef={tableRefTagihan.current}
            >
              <Print /> Tagihan
            </DownloadTableExcel>
          </Button>
          <Button
            color="primary"
            className="me-2 p-2-2"
            disabled={loadingData || loadingGetAllReportList}
          >
            <DownloadTableExcel
              filename={`rekap-gaji_${dateToday}`}
              sheet={`rekap-gaji-${dateToday}`}
              currentTableRef={tableRefRekap.current}
            >
              <Print /> Rekap Gaji
            </DownloadTableExcel>
          </Button>
        </Col>
      </Row>
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
      <TableExcelTagihanGaji
        tableRef={tableRefTagihan}
        period={searchPeriod}
        dataTotalTagihan={reportAllTagihanGaji}
        dataTagihanGaji={reportAllTagihanGaji}
        isFiltered={isFilteredTagihan}
        unitBisnis={unitBisnis}
      />

      <TableExcelRekapGaji
        tableRef={tableRefRekap}
        period={searchPeriod}
        dataTotalTagihan={reportAllTagihanGaji}
        dataTagihanGaji={reportAllTagihanGaji}
        isFiltered={isFilteredTagihan}
        unitBisnis={unitBisnis}
      />
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
    </>
  );
};

export default FilterTagihanGaji;
