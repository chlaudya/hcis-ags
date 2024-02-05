/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { green } from '@material-ui/core/colors';
import { Download } from '@material-ui/icons';
import { Typography, IconButton } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { getStateSlipGaji } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { paginationNumber } from 'utils/paginationNumber';
import { getGenerateSlipGaji } from 'store/actions/slip-gaji';
import FilterSlipGaji from './FilterSlipGaji';

const GenerateSlipGaji = () => {
  const dispatch = useDispatch();
  const { slipGaji, loading } = useSelector(getStateSlipGaji);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getGenerateSlipGaji(params));
  }, []);

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getGenerateSlipGaji({ ...params, page: page, size: slipGaji?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getGenerateSlipGaji({ ...params, page: page, size: row }));
  };

  const openPdf = (karyawan_nip) => {
    window.open(`${process.env.REACT_APP_API_GENERATE}/api/generate/slip_gaji?nip=${karyawan_nip}`);
  };

  const SLIP_GAJI_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) => `${paginationNumber(slipGaji?.page, slipGaji?.size, index)}.`
    },
    {
      name: 'NIP',
      width: '100px',
      center: true,
      wrap: true,
      selector: (row, index) => row.karyawan_nip
    },
    {
      name: 'Nama',
      center: true,
      width: '150px',
      wrap: true,
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Jabatan',
      center: true,
      wrap: true,
      selector: (row) => row.jabatan_name
    },

    {
      name: 'Unit Bisnis',
      center: true,
      wrap: true,
      selector: (row) => row.unit_name
    },

    {
      name: 'Period',
      center: true,
      width: '120px',
      selector: (row) => row.periode
    },
    {
      name: 'Download PDF',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openPdf(row.karyawan_nip)}
          >
            <Download style={{ color: green[700] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Generate Slip Gaji">
      <Typography variant="body2">
        <FilterSlipGaji params={params} />

        <DataTable
          columns={SLIP_GAJI_COLUMN}
          data={slipGaji?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={slipGaji?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default GenerateSlipGaji;
