/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, green, red } from '@material-ui/core/colors';
import { DoDisturb, Download, Edit, Print } from '@material-ui/icons';
import { Typography, IconButton, Button, Grid } from '@material-ui/core';
import { DownloadTableExcel } from 'react-export-table-to-excel';

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
import {
  getAllKontrakList,
  getKontrakList,
  getListKontrakByNip,
  stopKontrak
} from 'store/actions/kontrak';
import { renderDate } from 'utils/renderDate';
import { paginationNumber } from 'utils/paginationNumber';
import TableListKontrak from './components/TableListKontrak';
import FormReason from 'src/views/dashboard/components/FormReason';
import { getKaryawanDetail } from 'store/actions/karyawan';
import TableExcelKontrak from './components/TableExcelKontrak';

const KontrakPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);
  const { kontrakList, loading, isSubmitting, loadingStopKontrak, kontrakListAll, loadingAll } =
    useSelector(getStateKontrak);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });
  const [searchParams, setSearchParams] = useState({ ...params });
  const [unitBisnis, setUnitBisnis] = useState('');

  const tableRefKontrak = useRef(null);

  useEffect(() => {
    dispatch(
      getAllKontrakList({
        ...searchParams,
        page: 1,
        size: kontrakList?.total_record
      })
    );
  }, [kontrakList?.total_record]);

  useEffect(() => {
    if (!loadingStopKontrak) {
      dispatch(getKontrakList());
    }
  }, [loadingStopKontrak]);

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

  const openPdf = (data) => {
    if (data?.is_upload) {
      const newWindow = window.open();
      newWindow.document.write(
        '<iframe width="100%" height="100%" src="' + data?.upload_doc_kontrak + '"></iframe>'
      );
    } else {
      window.open(
        `${process.env.REACT_APP_API_GENERATE}/api/generate/pkwt?kontrak_id=${data?.kontrak_id}`
      );
    }
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

  const dateToday = renderDate(new Date());

  const handleRenderUnitBisnis = () => {
    const unitBisnis = dropdownUnitBisnis?.find((item) => item.value === searchParams?.unit_id);

    if (unitBisnis) setUnitBisnis(unitBisnis?.label);
  };

  useEffect(() => {
    handleRenderUnitBisnis();
  }, [searchParams?.unit_id]);

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
      wrap: true,
      center: true,
      selector: (row) => (
        <div onClick={() => openModalKontrakList(row.karyawan_nip)}>{row.karyawan_nip}</div>
      )
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
      width: '120px',
      selector: (row) =>
        renderDropdownLabel({ list: dropdownTempatTugas, selectedValue: row.tempat_tugas_id })
    },
    {
      name: 'Unit Bisnis',
      center: true,
      wrap: true,
      selector: (row) =>
        renderDropdownLabel({ list: dropdownUnitBisnis, selectedValue: row.unit_id })
    },
    {
      name: 'Jabatan',
      center: true,
      wrap: true,
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
          <IconButton color="secondary" onClick={() => redirectToEdit(row.kontrak_id)}>
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton color="secondary" onClick={() => openPdf(row)}>
            <Download style={{ color: green[700] }} />
          </IconButton>
          <IconButton color="warning" onClick={() => openModalConfirmation(row.kontrak_id)}>
            <DoDisturb style={{ color: red[900] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Data Kontrak">
      <Typography variant="body2">
        <FilterKontrak
          params={params}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Grid container>
          <Grid md={8}>
            <Link to="/human-capital/kontrak/input-kontrak" style={{ textDecoration: 'none' }}>
              <Button variant="contained">Input Kontrak</Button>
            </Link>
          </Grid>
          <Grid md={4} textAlign={'right'}>
            <Button color="primary" className="me-2 p-2-2" disabled={loadingAll}>
              <DownloadTableExcel
                filename={`daftar-kontrak-${dateToday}`}
                sheet={`daftar-kontrak-${dateToday}`}
                currentTableRef={tableRefKontrak.current}
              >
                <Print /> Generate List Kontrak
              </DownloadTableExcel>
            </Button>
          </Grid>
        </Grid>

        <DataTable
          columns={KONTRAK_COLUMN}
          data={kontrakList?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={kontrakList?.total_record}
          onRowClicked={(row) => openModalKontrakList(row.karyawan_nip)}
        />
      </Typography>

      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
      <TableExcelKontrak
        tableRef={tableRefKontrak}
        data={kontrakListAll?.data}
        unitBisnis={unitBisnis}
      />
      {/* =================== HIDDEN TABLE FOR EXCEL GENERATE ================== */}
    </MainCard>
  );
};

export default KontrakPage;
