/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import FilterKaryawan from './components/FilterKaryawan';
import DataTable from 'ui-component/data-table';
import { getStateKaryawan } from 'store/stateSelector';
import { getKaryawanList } from 'store/actions/karyawan';

const Karyawan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { karyawanList, loading } = useSelector(getStateKaryawan);
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    dropdown: false
  });

  useEffect(() => {
    dispatch(getKaryawanList(params));
  }, []);

  const redirectToEdit = (karyawanId, NIK, NIP) => {
    navigate('/human-capital/karyawan/input-karyawan', { state: { karyawanId, NIK, NIP } });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getKaryawanList({ ...params, page: page, size: karyawanList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getKaryawanList({ ...params, page: page, size: row }));
  };

  const KARYAWAN_COLUMN = [
    {
      name: 'NIP',
      width: '100px',
      center: true,
      selector: (row, index) => row.karyawanNip
    },
    {
      name: 'Nama',
      center: true,
      selector: (row) => row.karyawanName
    },
    {
      name: 'Tempat Tugas',
      center: true,
      selector: (row) => row.lokasiTempatTugas
    },
    {
      name: 'Unit Bisnis',
      center: true,
      selector: (row) => row.unitName
    },
    {
      name: 'Jabatan',
      center: true,
      selector: (row) => row.jabatan
    },
    {
      name: 'Aktif',
      center: true,
      selector: (row) => (row.isActive === 1 ? 'Aktif' : 'Tidak aktif')
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => redirectToEdit(row.karyawanId, row.noNIK, row.karyawanNip)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={(event) => this.handleModalDelete(event)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Data Karyawan">
      <Typography variant="body2">
        <FilterKaryawan params={params} />

        <Link to="/human-capital/karyawan/input-karyawan" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Input Karyawan</Button>
        </Link>

        <div style={{ height: 500, width: '100%' }}>
          <DataTable
            columns={KARYAWAN_COLUMN}
            data={karyawanList?.data}
            progressPending={loading}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            paginationTotalRows={karyawanList?.totalRecord}
          />
        </div>
      </Typography>
    </MainCard>
  );
};

export default Karyawan;
