/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, green, red } from '@material-ui/core/colors';
import { Delete, Edit, FactCheck } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import FilterKaryawan from './components/FilterKaryawan';
import DataTable from 'src/ui-component/data-table';
import {
  getStateKaryawan,
  getStateMasterBank,
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis
} from 'store/stateSelector';
import { getKaryawanList, stopKaryawan, updateKaryawan } from 'store/actions/karyawan';
import csrfProtection from 'utils/csrfProtection';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';
import { ModalContext } from 'src/ui-component/modal';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import FieldDetail from './components/FieldDetailKaryawan';
import { getDropdownBank } from 'store/actions/master-bank';
import { paginationNumber } from 'utils/paginationNumber';

const KaryawanPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);
  const { karyawanList, loading, isSubmitting, loadingStopKaryawan } =
    useSelector(getStateKaryawan);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);
  const { dropdownBank } = useSelector(getStateMasterBank);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    if (loadingStopKaryawan) {
      dispatch(getKaryawanList());
    }
  }, [loadingStopKaryawan]);

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getKaryawanList(params));
    dispatch(getDropdownJabatan());
    dispatch(getDropdownUnitBisnis());
    dispatch(getDropdownTempatTugas());
    dispatch(getDropdownBank());
  }, []);

  const redirectToEdit = (karyawanId) => {
    navigate(`/human-capital/karyawan/input-karyawan/${karyawanId}`);
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getKaryawanList({ ...params, page: page, size: karyawanList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getKaryawanList({ ...params, page: page, size: row }));
  };

  const openModalDetail = (id) => {
    showModal(MODAL_TYPES.MODAL_DETAIL, {
      modalTitle: 'Detail Karyawan',
      children: (
        <FieldDetail
          id={id}
          dropdownJabatan={dropdownJabatan}
          dropdownTempatTugas={dropdownTempatTugas}
          dropdownUnitBisnis={dropdownUnitBisnis}
          dropdownBank={dropdownBank}
        />
      )
    });
  };

  const onConfirmDelete = (id) => {
    const reqBody = {
      karyawan_id: id
    };
    dispatch(stopKaryawan(reqBody));
    hideModal();
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Data Karyawan',
      modalDescription: 'Anda yakin ingin menghapus data Karyawan ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const KARYAWAN_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(karyawanList?.page, karyawanList?.size, index)}.`
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
      wrap: true,
      width: '150px',
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Tempat Tugas',
      center: true,
      wrap: true,
      selector: (row) => row.nama_proyek
    },
    {
      name: 'Unit Bisnis',
      center: true,
      wrap: true,
      selector: (row) => row.unit_name
    },
    {
      name: 'Jabatan',
      center: true,
      wrap: true,
      selector: (row) => row.jabatan_name
    },
    {
      name: 'Aktif',
      center: true,
      selector: (row) => (row.is_active === true ? 'Aktif' : 'Tidak aktif')
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => redirectToEdit(row.karyawan_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalDetail(row.karyawan_id)}
          >
            <FactCheck style={{ color: green[700] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.karyawan_id)}
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

        <DataTable
          columns={KARYAWAN_COLUMN}
          data={karyawanList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={karyawanList?.total_record}
          //tambah onclick row
        />
      </Typography>
    </MainCard>
  );
};

export default KaryawanPage;
