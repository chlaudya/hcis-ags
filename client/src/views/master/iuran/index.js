/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { ModalContext } from 'src/ui-component/modal';
import FormFieldIuran from './iuran-form';
import csrfProtection from 'utils/csrfProtection';
import { getStateMasterIuran, getStateUser } from 'store/stateSelector';
import { addMasterIuran, getMasterIuran, updateMasterIuran } from 'store/actions/master-iuran';
import { inputThousandSeparator, removeThousandSeparator } from 'utils/thousandSeparator';
import { paginationNumber } from 'utils/paginationNumber';

const IuranPage = () => {
  const dispatch = useDispatch();
  const { showModal, hideModal } = useContext(ModalContext);
  const { masterIuranList, loading, isSubmitting } = useSelector(getStateMasterIuran);
  const { user } = useSelector(getStateUser);
  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getMasterIuran(params));
  }, []);

  const onSubmitFormField = async ({ values, id }) => {
    const formattedIuranBeban = Number(removeThousandSeparator(values.iuran_beban));

    const reqBodyEdit = {
      ...values,
      usr_update: user.preferred_username,
      iuran_beban: formattedIuranBeban
    };

    const reqBodyAdd = {
      ...values,
      iuran_beban: formattedIuranBeban
    };

    if (id) {
      dispatch(updateMasterIuran({ reqBody: reqBodyEdit, hideModal }));
    } else {
      dispatch(addMasterIuran(reqBodyAdd, hideModal));
    }
  };

  const onConfirmDelete = (id) => {
    const masterIuran = masterIuranList?.data.find((data) => data.iuran_id === id);
    const reqBody = {
      iuran_id: masterIuran?.iuran_id,
      iuran_beban: masterIuran?.iuran_beban,
      iuran_type: masterIuran?.iuran_type,
      iuran_persen: masterIuran?.iuran_persen,
      usr_update: user.preferred_username,
      is_active: false
    };
    dispatch(updateMasterIuran({ reqBody, hideModal, isDelete: true }));
  };

  const openModalAdd = () => {
    showModal(MODAL_TYPES.MODAL_ADD, {
      modalTitle: 'Add Master Iuran',
      children: <FormFieldIuran onSubmit={onSubmitFormField} />
    });
  };

  const openModalEdit = (id) => {
    showModal(MODAL_TYPES.MODAL_EDIT, {
      modalTitle: 'Edit Master Iuran',
      children: <FormFieldIuran id={id} onSubmit={onSubmitFormField} />
    });
  };

  const openModalConfirmation = (id) => {
    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Hapus Master Iuran',
      modalDescription: 'Anda yakin ingin menghapus Iuran ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmDelete(id),
      isSubmitting: isSubmitting
    });
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getMasterIuran({ ...params, page: page, size: masterIuranList?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getMasterIuran({ ...params, page: page, size: row }));
  };

  const COLUMN = [
    {
      name: 'No',
      width: '100px',
      center: true,
      selector: (_row, index) =>
        `${paginationNumber(masterIuranList?.page, masterIuranList?.size, index)}.`
    },
    {
      name: 'Tipe Iuran',
      center: true,
      selector: (row) => row.iuran_type
    },
    {
      name: 'Beban',
      center: true,
      selector: (row) => inputThousandSeparator(row.iuran_beban)
    },
    {
      name: 'Persentase',
      center: true,
      selector: (row) => `${row.iuran_persen}%`
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openModalEdit(row.iuran_id)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => openModalConfirmation(row.iuran_id)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Master Iuran">
      <Typography variant="body2">
        <Button variant="contained" className="mb-3" onClick={openModalAdd}>
          Input Iuran
        </Button>

        <DataTable
          columns={COLUMN}
          data={masterIuranList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={masterIuranList?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default IuranPage;
