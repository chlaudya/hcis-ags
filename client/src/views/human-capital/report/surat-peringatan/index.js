/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import FilterTagihanGaji from './FilterSuratPeringatan';
import DataTable from 'src/ui-component/data-table';
import { getStateReportSuratPeringatan } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { paginationNumber } from 'utils/paginationNumber';
import { renderDate } from 'utils/renderDate';
import { getReportSuratPeringatan } from 'store/actions/report-surat-peringatan';

const SuratPeringatanPage = () => {
  const dispatch = useDispatch();
  const { reportSuratPeringatan, loading, reportAllSuratPeringatan } = useSelector(
    getStateReportSuratPeringatan
  );

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getReportSuratPeringatan(params));
  }, []);

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(
      getReportSuratPeringatan({ ...params, page: page, size: reportSuratPeringatan?.size })
    );
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getReportSuratPeringatan({ ...params, page: page, size: row }));
  };

  const SURAT_PERINGATAN_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(reportSuratPeringatan?.page, reportSuratPeringatan?.size, index)}.`
    },
    {
      name: 'NIP',
      width: '100px',
      center: true,
      wrap: true,
      selector: (row) => row.karyawan_nip
    },
    {
      name: 'Nama',
      center: true,
      wrap: true,

      width: '150px',
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Jabatan',
      center: true,
      wrap: true,

      width: '150px',
      selector: (row) => row.jabatan_name
    },
    {
      name: 'Unit',
      center: true,
      wrap: true,
      width: '150px',
      selector: (row) => row.nama_proyek
    },
    {
      name: 'SP Ke',
      wrap: true,
      center: true,
      selector: (row) => row.surat_peringatan
    },
    {
      name: 'Tanggal SP',
      center: true,
      wrap: true,
      selector: (row) => renderDate(row.tanggal_surat_peringatan)
    }
  ];

  const tableRef = useRef(null);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL'
  };

  return (
    <MainCard title="Surat Peringatan">
      <Typography variant="body2">
        <FilterTagihanGaji
          params={params}
          tableRef={tableRef}
          reportData={reportSuratPeringatan}
          loadingData={loading}
          reportAllSuratPeringatan={reportAllSuratPeringatan}
        />

        <DataTable
          columns={SURAT_PERINGATAN_COLUMN}
          data={reportSuratPeringatan?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={reportSuratPeringatan?.total_record}
          paginationComponentOptions={paginationComponentOptions}
        />
      </Typography>
    </MainCard>
  );
};

export default SuratPeringatanPage;
