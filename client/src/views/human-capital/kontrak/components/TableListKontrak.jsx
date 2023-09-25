/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'src/ui-component/data-table';
import { getStateKontrak, getStateMasterUnitBisnis } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';
import { getDropdownBank } from 'store/actions/master-bank';
import { getKontrakList } from 'store/actions/kontrak';
import { renderDate } from 'utils/renderDate';
import { paginationNumber } from 'utils/paginationNumber';
import TableExcelListKontrak from '../../../dashboard/components/TableExcelListKontrak';
import { Button } from 'reactstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const TableListKontrak = () => {
  const dispatch = useDispatch();
  const { kontrakListByNip, loading } = useSelector(getStateKontrak);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  const tableRef = useRef(null);

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getKontrakList(params));
    dispatch(getDropdownJabatan());
    dispatch(getDropdownUnitBisnis());
    dispatch(getDropdownTempatTugas());
    dispatch(getDropdownBank());
  }, []);

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getKontrakList({ ...params, page: page, size: kontrakListByNip?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getKontrakList({ ...params, page: page, size: row }));
  };

  const dateToday = renderDate(new Date());

  const KONTRAK_LIST_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(kontrakListByNip?.page, kontrakListByNip?.size, index)}.`
    },
    {
      name: 'NIP',
      width: '100px',
      wrap: true,
      center: true,
      selector: (row) => row.karyawan_nip
    },
    {
      name: 'No. Kontrak',
      center: true,
      wrap: true,
      width: '150px',
      selector: (row) => row.kontrak_kode
    },
    {
      name: 'Nama',
      center: true,
      wrap: true,
      width: '150px',
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Unit Bisnis',
      center: true,
      wrap: true,
      selector: (row) =>
        renderDropdownLabel({ list: dropdownUnitBisnis, selectedValue: row.unit_id })
    },
    {
      name: 'Tgl. Habis Kontrak',
      width: '150px',
      center: true,
      selector: (row) => renderDate(row.tgl_habis_kontrak)
    },
    {
      name: 'Periode Kontrak',
      center: true,
      width: '120px',
      selector: (row) => row.period_kontrak
    },
    {
      name: 'Status',
      center: true,
      selector: (row) => (row.is_active ? 'Aktif' : 'Tidak Aktif')
    }
  ];

  return (
    <>
      <DataTable
        columns={KONTRAK_LIST_COLUMN}
        data={kontrakListByNip?.data}
        progressPending={loading}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        paginationTotalRows={kontrakListByNip?.total_record}
      />
      <Button
        color="primary"
        className="me-2 p-2-2"
        disabled={kontrakListByNip?.data?.length === 0}
      >
        <DownloadTableExcel
          filename={`daftar-kontrak-${dateToday}`}
          sheet={`daftar-kontrak-${dateToday}`}
          currentTableRef={tableRef.current}
        >
          Download
        </DownloadTableExcel>
      </Button>
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
      <TableExcelListKontrak tableRef={tableRef} listKontrak={kontrakListByNip?.data} />
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
    </>
  );
};

export default TableListKontrak;
