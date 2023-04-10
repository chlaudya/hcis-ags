/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { getStateMasterPajak, getStateUser } from 'store/stateSelector';
import FormFieldPajak from './pajak-form';
import { ModalContext } from 'src/ui-component/modal';
import csrfProtection from 'utils/csrfProtection';
import { addMasterPajak, getMasterPajak, updateMasterPajak } from 'store/actions/master-pajak';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { paginationNumber } from 'utils/paginationNumber';

const PajakPage = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useContext(ModalContext);
  const { masterPajakList, loading, isSubmitting } = useSelector(getStateMasterPajak);
  const { user } = useSelector(getStateUser);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getMasterPajak(params));
  }, []);

  const onSubmitFormField = async ({ values, id }) => {
    const reqBodyEdit = {
      ...values,
      usr_update: user.preferred_username
    };

    const reqBodyAdd = {
      ...values
    };

    if (id) {
      dispatch(updateMasterPajak({ reqBody: reqBodyEdit, hideModal }));
    } else {
      dispatch(addMasterPajak(reqBodyAdd, hideModal));
    }
  };

  const onConfirmDelete = (id) => {
    const masterPajak = masterPajakList?.data.find((data) => data.pajak_id === id);
    const reqBody = {
      pajak_id: masterPajak?.pajak_id,
      pajak_persen: masterPajak?.pajak_persen,
      pajak_status: masterPajak?.pajak_status,
      pajak_type: masterPajak?.pajak_type,
      usr_update: user.preferred_username,
      is_active: false
    };
    dispatch(updateMasterPajak({ reqBody, hideModal, isDelete: true }));
  };

  const openModalAdd = () => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'Add Master Pajak',
      children: <FormFieldPajak onSubmit={onSubmitFormField} />
    });
  };

  const openModalEdit = (id) => {
    showModal(MODAL_TYPES.MODAL_EDIT, {
      modalTitle: 'Edit Master Pajak',
      children: <FormFieldPajak id={id} onSubmit={onSubmitFormField} />
    });
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Master Pajak',
      modalDescription: 'Anda yakin ingin menghapus Pajak ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getMasterPajak({ ...params, page: page, size: masterPajakList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getMasterPajak({ ...params, page: page, size: row }));
  };

  const COLUMN = [
    {
      name: 'No',
      width: '100px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(masterPajakList?.page, masterPajakList?.size, index)}.`
    },
    {
      name: 'Tipe Pajak',
      width: '100px',
      wrap: true,
      center: true,
      selector: (row) => row.pajak_type
    },
    {
      name: 'Status',
      wrap: true,
      center: true,
      selector: (row) => row.pajak_status
    },
    {
      name: 'Persentase',
      center: true,
      wrap: true,
      selector: (row) => `${row.pajak_persen}%`
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalEdit(row.pajak_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.pajak_id)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Master Pajak">
      <Typography variant="body2">
        <Button variant="contained" className="mb-3" onClick={openModalAdd}>
          Input Pajak
        </Button>

        <DataTable
          columns={COLUMN}
          data={masterPajakList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={masterPajakList?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default PajakPage;
