/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Print, Search } from '@material-ui/icons';
import { Button, Col, Row } from 'reactstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import DatePicker from 'react-datepicker';
import { Label, Input } from 'reactstrap';
import { SearchFilter, DropdownFilter } from 'src/ui-component/tableFilters';
import { getStateMasterUnitBisnis } from 'store/stateSelector';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getReportTagihanGaji } from 'store/actions/report/reportAction';
import { getMonthYearDate, renderDate } from 'utils/renderDate';
import TableExcelTagihanGaji from './components/TableExcelTagihanGaji';
import { inputThousandSeparator, roundedThousandSeparator } from 'utils/thousandSeparator';

const FilterTagihanGaji = ({ params, tableRef, reportData }) => {
  const dispatch = useDispatch();
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const [reportDataGenerate, setReportDataGenerate] = useState([]);
  const [searchNip, setSearchNip] = useState();
  const [searchPeriod, setSearchPeriod] = useState();
  const [searchUnitBisnis, setSearchUnitBisnis] = useState();

  useEffect(() => {
    dispatch(getDropdownUnitBisnis());
  }, []);

  useEffect(() => {
    formattedReportData();
  }, [reportData?.data]);

  const formattedReportData = () => {
    reportData?.data?.length > 0 &&
      reportData?.data.forEach((data, index) => {
        setReportDataGenerate([
          {
            ...data,
            no: index + 1,
            gaji: roundedThousandSeparator(data.gaji),
            gaji_dibayar: roundedThousandSeparator(data.gaji_dibayar),
            manajemen_fee: roundedThousandSeparator(data.manajemen_fee),
            total: roundedThousandSeparator(data.total),
            tunjangan: roundedThousandSeparator(data.tunjangan)
          }
        ]);
      });
  };

  const onSearchNip = (value) => {
    setSearchNip(value);
  };

  const onSearchUnitBisnis = (value) => {
    setSearchUnitBisnis(value);
  };

  const onSearchPeriod = (value) => {
    setSearchPeriod(value);
  };

  const formattedPeriod = () => {
    const period = getMonthYearDate(searchPeriod);
    const formattedPeriod = period.split('/');
    return `${formattedPeriod[1]}/${formattedPeriod[2]}`;
  };

  const onClickSearch = () => {
    dispatch(
      getReportTagihanGaji({
        ...params,
        nip: searchNip,
        unit_id: searchUnitBisnis,
        periode: formattedPeriod()
      })
    );
  };

  const dateToday = renderDate(new Date());

  const InputDate = ({ onChange, value, id, onClick }) => (
    <Input id={id} placeholder="Select Date" onChange={onChange} value={value} onClick={onClick} />
  );

  console.log(reportData);
  return (
    <>
      <Row xs="1" sm="2" md="4" className="justify-content-between pt-1 mb-5">
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
          <Button outline color="primary" className="me-1" onClick={onClickSearch}>
            <Search /> Search
          </Button>
          <DownloadTableExcel
            filename={`tagihan-gaji_${dateToday}`}
            sheet={`tagihan-gaji-${dateToday}`}
            currentTableRef={tableRef.current}
          >
            <Button color="primary" className="p-2-2" disabled={reportData?.data?.length === 0}>
              <Print /> Generate
            </Button>
          </DownloadTableExcel>
        </Col>
      </Row>
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
      <TableExcelTagihanGaji
        tableRef={tableRef}
        data={reportDataGenerate}
        period={searchPeriod}
        dataTotalTagihan={reportData}
      />
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
    </>
  );
};

export default FilterTagihanGaji;
