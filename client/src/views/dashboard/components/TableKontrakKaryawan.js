/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { Send, DoDisturb } from '@material-ui/icons';
import { Typography, Button, Stack } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { getStateKaryawan } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { ModalContext } from 'src/ui-component/modal';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { paginationNumber } from 'utils/paginationNumber';
import { getDashboardData } from 'store/actions/dashboard';
import { getKaryawanDetail, getKaryawanList, updateKaryawan } from 'store/actions/karyawan';
import { getListKontrakByNip, stopKontrak } from 'store/actions/kontrak';
import TableListKontrak from 'views/human-capital/kontrak/components/TableListKontrak';

const TableKontrakKaryawan = ({ data, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);
  const { isSubmitting } = useSelector(getStateKaryawan);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDashboardData(params));
    dispatch(getKaryawanList(params));
  }, []);

  useEffect(() => {
    dispatch(getDashboardData(params));
  }, [isSubmitting]);

  const redirectToInputKontrak = (kontrakId) => {
    navigate(
      { pathname: `/human-capital/kontrak/input-kontrak/${kontrakId}` },
      { state: { extendContract: true } }
    );
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getDashboardData({ ...params, page: page, size: data?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getDashboardData({ ...params, page: page, size: row }));
  };

  const onConfirmStopContract = async (id) => {
    // API new berhenti Kontrak
    dispatch(stopKontrak(id));
    hideModal();
    dispatch(getDashboardData());
  };

  const openModalConfirmation = (id) => {
    dispatch(getKaryawanDetail(id));

    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Berhenti Kontrak',
      modalDescription: 'Anda yakin ingin memberhentikan kontrak karyawan ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmStopContract(id),
      isSubmitting: isSubmitting
    });
  };

  const openModalKontrakList = (nip) => {
    dispatch(getListKontrakByNip(nip));

    showModal(MODAL_TYPES.MODAL_DETAIL, {
      modalTitle: 'List Kontrak',
      size: 'xl',
      children: <TableListKontrak />
    });
  };

  const KONTRAK_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) => `${paginationNumber(data?.page, data?.size, index)}.`
    },
    {
      name: 'NIP',
      center: true,
      selector: (row) => (
        <div onClick={() => openModalKontrakList(row.karyawan_nip)}>{row.karyawan_nip}</div>
      )
    },
    {
      name: 'No. Kontrak',
      center: true,
      wrap: true,
      selector: (row, index) => row.no_kontrak
    },
    {
      name: 'Nama',
      center: true,
      wrap: true,
      selector: (row) => row.karyawan_name
    },
    {
      name: 'Aksi',
      center: true,
      cell: (row) => (
        <Stack direction="column" spacing={2}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            endIcon={<Send />}
            onClick={() => redirectToInputKontrak(row.kontrak_id)}
          >
            Perpanjang
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            endIcon={<DoDisturb />}
            onClick={() => openModalConfirmation(row.karyawan_id)}
          >
            Berhenti
          </Button>
        </Stack>
      )
    }
  ];

  return (
    <MainCard title="List Karyawan">
      <Typography variant="body2">
        <DataTable
          columns={KONTRAK_COLUMN}
          data={data?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={data?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default TableKontrakKaryawan;
