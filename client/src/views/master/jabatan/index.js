/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { getStateMasterJabatan, getStateUser } from 'store/stateSelector';
import {
  addMasterJabatan,
  getDropdownJabatan,
  getMasterJabatan,
  updateMasterJabatan
} from 'store/actions/master-jabatan';
import { ModalContext } from 'src/ui-component/modal';
import csrfProtection from 'utils/csrfProtection';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import FormFieldMasterJabatan from './jabatan-form';
import { inputThousandSeparator, removeThousandSeparator } from 'utils/thousandSeparator';

const JabatanPage = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useContext(ModalContext);
  const { masterJabatanList, loading, isSubmitting } = useSelector(getStateMasterJabatan);
  const { user } = useSelector(getStateUser);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getMasterJabatan(params));
    dispatch(getDropdownJabatan());
  }, []);

  const onSubmitFormField = async ({ values, id }) => {
    const formattedTunjangan = Number(removeThousandSeparator(values.tunjangan));

    const reqBodyEdit = {
      ...values,
      usr_update: user.preferred_username,
      tunjangan: formattedTunjangan
    };

    const reqBodyAdd = {
      ...values,
      tunjangan: formattedTunjangan
    };

    if (id) {
      dispatch(updateMasterJabatan({ reqBody: reqBodyEdit, hideModal }));
    } else {
      dispatch(addMasterJabatan(reqBodyAdd, hideModal));
    }
  };

  const onConfirmDelete = (id) => {
    const masterJabatan = masterJabatanList?.data.find((data) => data.jabatan_id === id);
    const reqBody = {
      jabatan_id: masterJabatan?.jabatan_id,
      jabatan_name: masterJabatan?.jabatan_name,
      jabatan_desc: masterJabatan?.jabatan_desc,
      usr_update: user.preferred_username,
      is_active: false
    };
    dispatch(updateMasterJabatan({ reqBody, hideModal, isDelete: true }));
  };

  const openModalAdd = () => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'Add Master Jabatan',
      children: <FormFieldMasterJabatan onSubmit={onSubmitFormField} />
    });
  };

  const openModalEdit = (id) => {
    showModal(MODAL_TYPES.MODAL_EDIT, {
      modalTitle: 'Edit Master Jabatan',
      children: <FormFieldMasterJabatan id={id} onSubmit={onSubmitFormField} />
    });
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Master Jabatan',
      modalDescription: 'Anda yakin ingin menghapus Jabatan ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
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
      name: 'Jabatan Name',
      center: true,
      selector: (row) => row.jabatan_name
    },
    {
      name: 'Jabatan Description',
      center: true,
      selector: (row) => row.jabatan_desc
    },
    {
      name: 'Tunjangan',
      center: true,
      selector: (row) => inputThousandSeparator(row.tunjangan)
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalEdit(row.jabatan_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.jabatan_id)}
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
        <Button variant="contained" className="mb-3" onClick={openModalAdd}>
          Input Master Jabatan
        </Button>

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
