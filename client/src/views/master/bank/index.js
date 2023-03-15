/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import MainCard from 'src/ui-component/cards/MainCard';
import DataTable from 'src/ui-component/data-table';
import { ModalContext } from 'src/ui-component/modal';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import FormFieldBank from './bank-form';

import { addMasterBank, getMasterBank, updateMasterBank } from 'store/actions/master-bank';
import { getStateUser, getStateMasterBank } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';

const BankPage = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useContext(ModalContext);
  const { masterBankList, loading, isSubmitting } = useSelector(getStateMasterBank);
  const { user } = useSelector(getStateUser);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getMasterBank(params));
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
      dispatch(updateMasterBank({ reqBody: reqBodyEdit, hideModal }));
    } else {
      dispatch(addMasterBank(reqBodyAdd, hideModal));
    }
  };

  const onConfirmDelete = (id) => {
    const masterBank = masterBankList?.data.find((data) => data.bank_id === id);
    const reqBody = {
      bank_id: masterBank?.bank_id,
      bank_name: masterBank?.bank_name,
      bank_desc: masterBank?.bank_desc,
      usr_update: user.preferred_username,
      is_active: false
    };
    dispatch(updateMasterBank({ reqBody, hideModal, isDelete: true }));
  };

  const openModalAdd = () => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'Add Master Bank',
      children: <FormFieldBank onSubmit={onSubmitFormField} />
    });
  };

  const openModalEdit = (id) => {
    showModal(MODAL_TYPES.MODAL_EDIT, {
      modalTitle: 'Edit Master Bank',
      children: <FormFieldBank id={id} onSubmit={onSubmitFormField} />
    });
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Master Bank',
      modalDescription: 'Anda yakin ingin menghapus Bank ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getMasterBank({ ...params, page: page, size: masterBankList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getMasterBank({ ...params, page: page, size: row }));
  };

  const COLUMN = [
    {
      name: 'No',
      width: '100px',
      center: true,
      selector: (_row, index) => `${index + 1}.`
    },
    {
      name: 'Bank Name',
      center: true,
      selector: (row) => row.bank_name
    },
    {
      name: 'Bank Description',
      center: true,
      selector: (row) => row.bank_desc
    },
    {
      name: 'Aksi',
      center: true,
      width: '200px',
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalEdit(row.bank_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.bank_id)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Master Bank">
      <Typography variant="body2">
        {/* <Link to="/human-capital/master-bank/input" style={{ textDecoration: 'none' }}> */}
        <Button variant="contained" className="mb-3" onClick={openModalAdd}>
          Input Bank
        </Button>
        {/* </Link> */}

        <div style={{ height: 500, width: '100%' }}>
          <DataTable
            columns={COLUMN}
            data={masterBankList?.data}
            progressPending={loading}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            paginationTotalRows={masterBankList?.totalRecord}
          />
        </div>
      </Typography>
    </MainCard>
  );
};

export default BankPage;
