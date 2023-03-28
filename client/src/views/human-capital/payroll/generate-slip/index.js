/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'src/ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { blue, green, red } from '@material-ui/core/colors';
import { Delete, Download, Edit } from '@material-ui/icons';
import { Typography, IconButton, Button } from '@material-ui/core';

// import FilterKontrak from './components/FilterKontrak';
import DataTable from 'src/ui-component/data-table';
import {
  getStateKontrak,
  getStateMasterJabatan,
  getStateMasterTempatTugas,
  getStateMasterUnitBisnis,
  getStateSlipGaji
} from 'store/stateSelector';
import csrfProtection from 'utils/csrfProtection';
import { renderDropdownLabel } from 'utils/renderDropdownLabel';
import { getDropdownJabatan } from 'store/actions/master-jabatan';
import { getDropdownUnitBisnis } from 'store/actions/master-unit-bisnis';
import { getDropdownTempatTugas } from 'store/actions/master-tempat-tugas';
import { ModalContext } from 'src/ui-component/modal';
import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';
import { getDropdownBank } from 'store/actions/master-bank';
import { renderDate } from 'utils/renderDate';
import { paginationNumber } from 'utils/paginationNumber';
import { getGenerateSlipGaji } from 'store/actions/slip-gaji';
import FilterSlipGaji from './FilterSlipGaji';

const GenerateSlipGaji = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, hideModal } = useContext(ModalContext);
  const { slipGaji, loading } = useSelector(getStateSlipGaji);
  const { dropdownJabatan } = useSelector(getStateMasterJabatan);
  const { dropdownUnitBisnis } = useSelector(getStateMasterUnitBisnis);
  const { dropdownTempatTugas } = useSelector(getStateMasterTempatTugas);

  const [params, setParams] = useState({
    page: 1,
    size: 10
  });

  useEffect(() => {
    csrfProtection.setHeaderCsrfToken();
    dispatch(getGenerateSlipGaji(params));
  }, []);

  const redirectToEdit = (kontrakId) => {
    navigate(`/human-capital/kontrak/input-kontrak/${kontrakId}`);
  };

  const onChangePage = (page) => {
    setParams({ ...params, page: page });
    dispatch(getGenerateSlipGaji({ ...params, page: page, size: slipGaji?.size }));
  };

  const onChangeRowsPerPage = (row, page) => {
    setParams({ ...params, size: row });
    dispatch(getGenerateSlipGaji({ ...params, page: page, size: row }));
  };

  const openPdf = (karyawan_nip) => {
    window.open(`${process.env.REACT_APP_API_GENERATE}/api/generate/slip_gaji?nip=${karyawan_nip}`);
  };

  const SLIP_GAJI_COLUMN = [
    {
      name: 'No',
      width: '50px',
      center: true,
      selector: (_row, index) => `${paginationNumber(slipGaji?.page, slipGaji?.size, index)}.`
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
      name: 'Jabatan',
      center: true,
      selector: (row) => row.jabatan_name
    },

    {
      name: 'Unit Bisnis',
      center: true,
      selector: (row) => row.unit_name
    },

    {
      name: 'Period',
      center: true,
      width: '120px',
      selector: (row) => row.periode
    },
    {
      name: 'Download PDF',
      center: true,
      cell: (row, index) => (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => openPdf(row.karyawan_nip)}
          >
            <Download style={{ color: green[700] }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <MainCard title="Generate Slip Gaji">
      <Typography variant="body2">
        <FilterSlipGaji params={params} />

        <DataTable
          columns={SLIP_GAJI_COLUMN}
          data={slipGaji?.data}
          progressPending={loading}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationTotalRows={slipGaji?.total_record}
        />
      </Typography>
    </MainCard>
  );
};

export default GenerateSlipGaji;
