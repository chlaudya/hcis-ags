/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import {
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis,
  getStateUser
} from 'store/stateSelector';
import { ModalContext } from 'src/ui-component/modal';
import csrfProtection from 'utils/csrfProtection';
import {
  addMasterTempatTugas,
  getMasterTempatTugas,
  updateMasterTempatTugas
} from 'store/actions/master-tempat-tugas';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import FormFieldTempatTugas from './tempat-tugas-form';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { inputThousandSeparator, removeThousandSeparator } from 'utils/thousandSeparator';
import { paginationNumber } from 'utils/paginationNumber';

const TempatTugasPage = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useContext(ModalContext);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { masterTempatTugasList, loading, isSubmitting } = useSelector(getStateMasterTempatTugas);
  const { user } = useSelector(getStateUser);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getMasterTempatTugas(params));
    dispatch(getDropdownJabatan());
    dispatch(getDropdownUnitBisnis());
  }, []);

  const onSubmitFormField = async ({ values, id }) => {
    const formattedNominalTunjangan = Number(removeThousandSeparator(values.nominal_tunjangan));
    const formattedTunjanganTetap = Number(removeThousandSeparator(values.tunjangan_tetap));

    const reqBodyEdit = {
      ...values,
      usr_update: user.preferred_username,
      nominal_tunjangan: formattedNominalTunjangan,
      tunjangan_tetap: formattedTunjanganTetap
    };

    const reqBodyAdd = {
      ...values,
      nominal_tunjangan: formattedNominalTunjangan,
      tunjangan_tetap: formattedTunjanganTetap
    };

    if (id) {
      dispatch(updateMasterTempatTugas({ reqBody: reqBodyEdit, hideModal }));
    } else {
      dispatch(addMasterTempatTugas(reqBodyAdd, hideModal));
    }
  };

  const onConfirmDelete = (id) => {
    const masterTempatTugas = masterTempatTugasList?.data.find(
      (data) => data.tempat_tugas_id === id
    );
    const reqBody = {
      tempat_tugas_id: masterTempatTugas?.tempat_tugas_id,
      jabatan_id: masterTempatTugas?.jabatan_id,
      lokasi_tempat_tugas: masterTempatTugas?.lokasi_tempat_tugas,
      nama_proyek: masterTempatTugas?.nama_proyek,
      nominal_tunjangan: masterTempatTugas?.nominal_tunjangan,
      tunjangan_tetap: masterTempatTugas?.tunjangan_tetap,
      unit_id: masterTempatTugas?.unit_id,
      usr_update: user.preferred_username,
      is_active: false
    };
    dispatch(updateMasterTempatTugas({ reqBody, hideModal, isDelete: true }));
  };

  const openModalAdd = () => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'Add Master Tempat Tugas',
      children: (
        <FormFieldTempatTugas
          onSubmit={onSubmitFormField}
          dropdownJabatan={dropdownJabatan}
          dropdownUnitBisnis={dropdownUnitBisnis}
        />
      )
    });
  };

  const openModalEdit = (id) => {
    showModal(MODAL_TYPES.MODAL_EDIT, {
      modalTitle: 'Edit Master Tempat Tugas',
      children: (
        <FormFieldTempatTugas
          id={id}
          onSubmit={onSubmitFormField}
          dropdownJabatan={dropdownJabatan}
          dropdownUnitBisnis={dropdownUnitBisnis}
        />
      )
    });
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Master Tempat Tugas',
      modalDescription: 'Anda yakin ingin menghapus Tempat Tugas ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getMasterTempatTugas({ ...params, page: page, size: masterTempatTugasList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getMasterTempatTugas({ ...params, page: page, size: row }));
  };

  const COLUMN = [
    {
      name: 'No',
      width: '100px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(masterTempatTugasList?.page, masterTempatTugasList?.size, index)}.`
    },
    {
      name: 'Jabatan ID',
      center: true,
      wrap: true,
      selector: (row) =>
        renderDropdownLabel({ list: dropdownJabatan, selectedValue: row.jabatan_id })
    },
    {
      name: 'Unit ID',
      center: true,
      wrap: true,
      selector: (row) =>
        renderDropdownLabel({ list: dropdownUnitBisnis, selectedValue: row.unit_id })
    },
    {
      name: 'Lokasi Tempat Tugas',
      center: true,
      wrap: true,
      selector: (row) => row.lokasi_tempat_tugas
    },
    {
      name: 'Nama Proyek',
      center: true,
      wrap: true,
      selector: (row) => row.nama_proyek
    },
    {
      name: 'Nominal Tunjangan',
      center: true,
      wrap: true,
      selector: (row) => inputThousandSeparator(row.nominal_tunjangan)
    },
    {
      name: 'Tunjangan Tetap',
      center: true,
      wrap: true,
      selector: (row) => inputThousandSeparator(row.tunjangan_tetap)
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalEdit(row.tempat_tugas_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.tempat_tugas_id)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Master Tempat Tugas">
      <Typography variant="body2">
        <Button variant="contained" className="mb-3" onClick={openModalAdd}>
          Input Tempat Tugas
        </Button>

        <DataTable
          columns={COLUMN}
          data={masterTempatTugasList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={masterTempatTugasList?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default TempatTugasPage;
