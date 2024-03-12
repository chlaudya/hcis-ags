/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { Send, DoDisturb, Print } from '@material-ui/icons';
import { Typography, Button, Stack, Grid } from '@material-ui/core';

import DataTable from 'src/ui-component/data-table';
import { getStateDashboard, getStateKaryawan, getStateKontrak } from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { ModalContext } from 'src/ui-component/modal';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { paginationNumber } from 'utils/paginationNumber';
import { getAllDashboardData, getDashboardData } from 'store/actions/dashboard';
import { getKaryawanDetail, getKaryawanList } from 'store/actions/karyawan';
import { getListKontrakByNip, stopKontrak } from 'store/actions/kontrak';
import TableListKontrak from 'views/human-capital/kontrak/components/TableListKontrak';
import FormReason from './FormReason';
import { renderDate } from 'utils/renderDate';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import TableExcelKaryawanDashboard from './TableExcelKaryawanDashboard';

const TableKontrakKaryawan = ({ data, loading, params, setParams }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);
  const { isSubmitting } = useSelector(getStateKaryawan);
  const { loadingStopKontrak } = useSelector(getStateKontrak);
  const tableRefKaryawanDashboard = useRef(null);
  const dateToday = renderDate(new Date());
  const { loadingAllData, dashboardAllData } = useSelector(getStateDashboard);

  useEffect(() => {
    if (!loadingStopKontrak) {
      dispatch(getDashboardData());
    }
  }, [loadingStopKontrak]);

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getDashboardData(params));
    dispatch(getKaryawanList(params));
  }, []);

  useEffect(() => {
    dispatch(
      getAllDashboardData({
        ...params,
        page: 1,
        size: data?.total_record
      })
    );
  }, [data?.total_record, params]);

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
    const reqBody = {
      kontrak_id: id,
      alasan: localStorage.getItem('reason')
    };

    dispatch(stopKontrak(reqBody));
    hideModal();
  };

  const openModalConfirmation = (id) => {
    dispatch(getKaryawanDetail(id));

    showModal(MODAL_TYPES.MODAL_CONFIRMATION, {
      modalTitle: 'Berhenti Kontrak',
      modalDescription: 'Anda yakin ingin memberhentikan kontrak karyawan ini?',
      confirmText: 'Yes',
      cancelText: 'No',
      handleConfirm: () => onConfirmStopContract(id),
      isSubmitting: isSubmitting,
      children: <FormReason onChange={(e) => localStorage.setItem('reason', e.value)} />
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
      selector: (row) => row.karyawan_nip
    },
    {
      name: 'No. Kontrak',
      center: true,
      wrap: true,
      selector: (row) => row.no_kontrak
    },
    {
      name: 'Tgl Habis Kontrak',
      center: true,
      wrap: true,
      selector: (row) => renderDate(row.tgl_habis_kontrak)
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
            onClick={() => openModalConfirmation(row.kontrak_id)}
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
        <Grid container>
          <Grid md={8}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setParams({ page: 1, size: 10 });
                dispatch(getDashboardData());
              }}
            >
              Clear Filter
            </Button>
          </Grid>
          <Grid md={4} textAlign={'right'}>
            <Button color="primary" className="me-2 p-2-2" disabled={loadingAllData}>
              <DownloadTableExcel
                filename={`data-habis-kontrak_${dateToday}`}
                sheet={`data-habis-kontrak-${dateToday}`}
                currentTableRef={tableRefKaryawanDashboard.current}
              >
                <Print /> Generate Data Habis Kontrak
              </DownloadTableExcel>
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={KONTRAK_COLUMN}
          data={data?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={data?.total_record}
          onRowClicked={(row) => openModalKontrakList(row.karyawan_nip)}
        />
      </Typography>

      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
      <TableExcelKaryawanDashboard
        tableRef={tableRefKaryawanDashboard}
        period={params.days}
        data={dashboardAllData?.data}
      />
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
    </MainCard>
  );
};

export default TableKontrakKaryawan;
