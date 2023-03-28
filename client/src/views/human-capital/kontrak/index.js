/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, green, red } from '@material-ui/core/colors';
import { Delete, Download, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import FilterKontrak from './components/FilterKontrak';
import DataTable from 'src/ui-component/data-table';
import {
  getStateKontrak,
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis
} from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';
import { ModalContext } from 'src/ui-component/modal';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { getDropdownBank } from 'store/actions/master-bank';
import { getKontrakList, updateKontrak } from 'store/actions/kontrak';
import { renderDate } from 'utils/renderDate';
import { paginationNumber } from 'utils/paginationNumber';

const KontrakPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);
  const { kontrakList, loading, isSubmitting } = useSelector(getStateKontrak);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getKontrakList(params));
    dispatch(getDropdownJabatan());
    dispatch(getDropdownUnitBisnis());
    dispatch(getDropdownTempatTugas());
    dispatch(getDropdownBank());
  }, []);

  const redirectToEdit = (kontrakId) => {
    navigate(`/human-capital/kontrak/input-kontrak/${kontrakId}`);
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getKontrakList({ ...params, page: page, size: kontrakList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getKontrakList({ ...params, page: page, size: row }));
  };

  const openPdf = (kontrakId) => {
    window.open(`${process.env.REACT_APP_API_GENERATE}/api/generate/pkwt?kontrak_id=${kontrakId}`);
  };

  const onConfirmDelete = (id) => {
    const kontrak = kontrakList?.data.find((data) => data.kontrak_id === id);
    const reqBody = {
      ...kontrak,
      is_active: false
    };
    dispatch(updateKontrak({ reqBody, hideModal, isDelete: true }));
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Data Kontrak',
      modalDescription: 'Anda yakin ingin menghapus data Kontrak ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const KONTRAK_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) => `${paginationNumber(kontrakList?.page, kontrakList?.size, index)}.`
    },
    {
      name: 'NIP',
      width: '100px',
      center: true,
      selector: (row, index) => row.karyawan_nip
    },
    {
      name: 'Nama',
      center: true,
      width: '150px',
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Tempat Tugas',
      center: true,
      width: '120px',
      selector: (row) =>
        renderDropdownLabel({ list: dropdownTempatTugas, selectedValue: row.tempat_tugas_id })
    },
    {
      name: 'Unit Bisnis',
      center: true,
      selector: (row) =>
        renderDropdownLabel({ list: dropdownUnitBisnis, selectedValue: row.unit_id })
    },
    {
      name: 'Jabatan',
      center: true,
      selector: (row) =>
        renderDropdownLabel({ list: dropdownJabatan, selectedValue: row.jabatan_id })
    },
    {
      name: 'Periode Kontrak',
      center: true,
      width: '120px',
      selector: (row) => row.period_kontrak
    },
    {
      name: 'Tgl. Masuk Kerja',
      center: true,
      width: '150px',
      selector: (row) => renderDate(row.tgl_masuk_kerja)
    },
    {
      name: 'Tgl. Habis Kontrak',
      width: '150px',
      center: true,
      selector: (row) => renderDate(row.tgl_habis_kontrak)
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => redirectToEdit(row.kontrak_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openPdf(row.kontrak_id)}
          >
            <Download style={{ color: green[700] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.kontrak_id)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Data Kontrak">
      <Typography variant="body2">
        <FilterKontrak params={params} />

        <Link to="/human-capital/kontrak/input-kontrak" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Input Kontrak</Button>
        </Link>

        <DataTable
          columns={KONTRAK_COLUMN}
          data={kontrakList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={kontrakList?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default KontrakPage;
