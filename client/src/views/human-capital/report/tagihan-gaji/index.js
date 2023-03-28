/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import FilterTagihanGaji from './FilterTagihanGaji';
import DataTable from 'src/ui-component/data-table';
import { getStateReport } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { getReportTagihanGaji } from 'store/actions/report/reportAction';
import { inputThousandSeparator, roundedThousandSeparator } from 'utils/thousandSeparator';
import { paginationNumber } from 'utils/paginationNumber';

const TagihanGajiPage = () => {
  const dispatch = useDispatch();
  const { reportTagihanGaji, loading } = useSelector(getStateReport);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getReportTagihanGaji(params));
  }, []);

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getReportTagihanGaji({ ...params, page: page, size: reportTagihanGaji?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getReportTagihanGaji({ ...params, page: page, size: row }));
  };

  const TAGIHAN_GAJI_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(reportTagihanGaji?.page, reportTagihanGaji?.size, index)}.`
    },
    {
      name: 'NIP',
      width: '100px',
      center: true,
      selector: (row, index) => row.karyawan_nip
    },
    {
      name: 'Nama Pegawai',
      center: true,
      width: '150px',
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Tugas / Jabatan',
      center: true,
      width: '150px',
      selector: (row) => row.jabatan_name
    },
    {
      name: 'Tempat Tugas',
      center: true,
      width: '150px',
      selector: (row) => row.nama_proyek
    },
    {
      name: 'Gaji',
      center: true,
      selector: (row) => roundedThousandSeparator(row.gaji)
    },
    {
      name: 'Tunjangan',
      center: true,
      selector: (row) => inputThousandSeparator(row.tunjangan)
    },
    {
      name: 'Gaji Dibayar',
      center: true,
      selector: (row) => roundedThousandSeparator(row.gaji_dibayar)
    },
    {
      name: 'Manajemen Fee',
      center: true,
      width: '150px',
      selector: (row) => roundedThousandSeparator(row.manajemen_fee)
    },
    {
      name: 'Total',
      center: true,
      selector: (row) => roundedThousandSeparator(row.total)
    }
  ];

  const tableRef = useRef(null);

  return (
    <MainCard title="Tagihan Gaji">
      <Typography variant="body2">
        <FilterTagihanGaji params={params} tableRef={tableRef} reportData={reportTagihanGaji} />

        <DataTable
          columns={TAGIHAN_GAJI_COLUMN}
          data={reportTagihanGaji?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={reportTagihanGaji?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default TagihanGajiPage;
