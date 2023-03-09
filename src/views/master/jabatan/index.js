/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import DataTable from 'ui-component/data-table';
import { getStateMasterJabatan } from 'store/stateSelector';
import { getMasterJabatan } from 'store/actions/master-jabatan';

const JabatanPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { masterJabatanList, loading } = useSelector(getStateMasterJabatan);
  const [params, setParams] = useState({
    page: 1,
    size: 10,
    dropdown: false
  });

  useEffect(() => {
    dispatch(getMasterJabatan(params));
  }, []);

  const redirectToEdit = (JabatanId) => {
    navigate('/master/jabatan/input-master-jabatan', { state: { JabatanId } });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getMasterJabatan({ ...params, page: page, size: masterJabatanList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getMasterJabatan({ ...params, page: page, size: row }));
  };

  const COLUMN = [
    {
      name: 'No',
      width: '100px',
      center: true,
      selector: (_row, index) => index + 1
    },
    {
      name: 'Jabatan ID',
      width: '100px',
      center: true,
      selector: (row) => row.jabatanId
    },
    {
      name: 'Jabatan Name',
      center: true,
      selector: (row) => row.jabatanName
    },
    {
      name: 'Jabatan Description',
      center: true,
      selector: (row) => row.jabatanDesc
    },
    {
      name: 'Tunjangan',
      center: true,
      selector: (row) => row.tunjangan
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
            onClick={() => redirectToEdit(row.jabatanId)}
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
    <MainCard title="Master Jabatan">
      <Typography variant="body2">
        <Link to="/human-capital/master-jabatan/input" style={{ textDecoration: 'none' }}>
          <Button variant="contained" className="mb-3">
            Input Master Jabatan
          </Button>
        </Link>

        <div style={{ height: 500, width: '100%' }}>
          <DataTable
            columns={COLUMN}
            data={masterJabatanList?.data}
            progressPending={loading}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            paginationTotalRows={masterJabatanList?.totalRecord}
          />
        </div>
      </Typography>
    </MainCard>
  );
};

export default JabatanPage;
