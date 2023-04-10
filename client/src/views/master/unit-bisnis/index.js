/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { getStateMasterUnitBisnis, getStateUser } from 'store/stateSelector';
import { ModalContext } from 'src/ui-component/modal';
import {
  addMasterUnitBisnis,
  getMasterUnitBisnis,
  updateMasterUnitBisnis
} from 'store/actions/master-unit-bisnis';
import csrfProtection from 'utils/csrfProtection';
import FormFieldUnitBisnis from './unit-bisnis-form';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { paginationNumber } from 'utils/paginationNumber';

const UnitBisnisPage = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useContext(ModalContext);
  const { masterUnitBisnisList, loading, isSubmitting } = useSelector(getStateMasterUnitBisnis);
  const { user } = useSelector(getStateUser);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getMasterUnitBisnis(params));
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
      dispatch(updateMasterUnitBisnis({ reqBody: reqBodyEdit, hideModal }));
    } else {
      dispatch(addMasterUnitBisnis(reqBodyAdd, hideModal));
    }
  };

  const onConfirmDelete = (id) => {
    const masterUnitBisnis = masterUnitBisnisList?.data.find((data) => data.unit_id === id);
    const reqBody = {
      unit_id: masterUnitBisnis?.unit_id,
      unit_name: masterUnitBisnis?.unit_name,
      unit_description: masterUnitBisnis?.unit_description,
      usr_update: user.preferred_username,
      is_active: false
    };
    dispatch(updateMasterUnitBisnis({ reqBody, hideModal, isDelete: true }));
  };

  const openModalAdd = () => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'Add Master Unit Bisnis',
      children: <FormFieldUnitBisnis onSubmit={onSubmitFormField} />
    });
  };

  const openModalEdit = (id) => {
    showModal(MODAL_TYPES.MODAL_EDIT, {
      modalTitle: 'Edit Master Unit Bisnis',
      children: <FormFieldUnitBisnis id={id} onSubmit={onSubmitFormField} />
    });
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Master Unit Bisnis',
      modalDescription: 'Anda yakin ingin menghapus Unit Bisnis ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getMasterUnitBisnis({ ...params, page: page, size: masterUnitBisnisList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getMasterUnitBisnis({ ...params, page: page, size: row }));
  };

  const COLUMN = [
    {
      name: 'No',
      width: '100px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(masterUnitBisnisList?.page, masterUnitBisnisList?.size, index)}.`
    },
    {
      name: 'Unit Name',
      wrap: true,
      center: true,
      selector: (row) => row.unit_name
    },
    {
      name: 'Unit Description',
      wrap: true,
      center: true,
      selector: (row) => row.unit_description
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalEdit(row.unit_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.unit_id)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Master Unit Bisnis">
      <Typography variant="body2">
        <Button variant="contained" className="mb-3" onClick={openModalAdd}>
          Input Unit Bisnis
        </Button>

        <DataTable
          columns={COLUMN}
          data={masterUnitBisnisList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={masterUnitBisnisList?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default UnitBisnisPage;
