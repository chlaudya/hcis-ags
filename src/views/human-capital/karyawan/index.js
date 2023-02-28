import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, IconButton, Button } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';

// Modal
import { ModalContext } from 'ui-component/modal';
import { MODAL_TYPES } from 'ui-component/modal/modalConstant';
import FormFieldKaryawan from './FormFieldKaryawan';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStateKaryawan } from 'store/stateSelector';
import { getKaryawanList } from 'store/actions/karyawan';
import DataTable from 'ui-component/data-table';
import FilterKaryawan from './components/FilterKaryawan';

const Karyawan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { karyawanList, loading } = useSelector(getStateKaryawan);
  const { showModal, hideModal } = useContext(ModalContext);
  const [karyawan, setKaryawan] = useState();

  useEffect(() => {
    dispatch(getKaryawanList());
    // setKaryawanList();
  }, []);

  console.log(karyawanList?.data);

  const setKaryawanList = () => {
    const karyawanUpdate = [...karyawanList?.data, { id: 1 }];
    console.log('update', karyawanUpdate);
    // setKaryawan(karyawanList)
  };

  const openModalAddKaryawan = (id) => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'View Pending Approval Detail',
      children: (
        <FormFieldKaryawan />
        // <div>halo WT</div>
        // <ViewFieldApproval
        //   id={id}
        //   onSubmit={onSubmitApproval}
        //   onCancel={hideModal}
        // />
      )
    });
  };

  const redirectToEdit = (karyawanId, NIK, NIP) => {
    navigate('/human-capital/karyawan/input-karyawan', { state: { karyawanId, NIK, NIP } });
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
          <IconButton color="warning" aria-label="add an alarm" onClick={(event) => this.handleModalDelete(event)}>
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Data Karyawan">
      <Typography variant="body2">
        <FilterKaryawan />

        <Link to="/human-capital/karyawan/input-karyawan" style={{ textDecoration: 'none' }}>
          <Button>Input Karyawan</Button>
        </Link>

        <div style={{ height: 500, width: '100%' }}>
          <DataTable
            columns={KARYAWAN_COLUMN}
            data={karyawanList?.data}
            progressPending={loading}
            // onChangePage={onChangePage}
            // onChangeRowsPerPage={onChangeRowsPerPage}
            // paginationTotalRows={agentList?.total_record}
          />
        </div>
      </Typography>
    </MainCard>
  );
};

export default Karyawan;
