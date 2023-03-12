import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MainCard from 'src/ui-component/cards/MainCard';
import { Typography, IconButton } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';

import KontrakModal from './modalAdd';

const columns = [
  { field: 'id', headerName: 'NIP', width: 110 },
  { field: 'namakaryawan', headerName: 'Nama Karyawan', width: 300 },
  { field: 'lokasi', headerName: 'Lokasi Tugas', width: 300 },
  { field: 'posisi', headerName: 'Posisi', width: 150 },
  { field: 'period', headerName: 'Periode', width: 150 },
  { field: 'mulai', headerName: 'Mulai Kontrak', width: 180 },
  {
    field: 'berakhir',
    headerName: 'Berakhir',
    width: 180
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 130,
    renderCell: (cellValues) => {
      return (
        <>
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={(event) => this.handleModalDelete(event, cellValues)}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={(event) => this.handleModalDelete(event, cellValues)}
          >
            <Delete style={{ color: red[900] }} />
          </IconButton>
        </>
      );
    }
  }
];

const rows = [
  {
    id: '001',
    namakaryawan: 'Snow',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '002',
    namakaryawan: 'Lannister',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '003',
    namakaryawan: 'Lannister',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '004',
    namakaryawan: 'Stark',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '005',
    namakaryawan: 'Targaryen',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '006',
    namakaryawan: 'Melisandre',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '007',
    namakaryawan: 'Clifford',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '008',
    namakaryawan: 'Frances',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  },
  {
    id: '009',
    namakaryawan: 'Roxie',
    lokasi: 'Bandung',
    posisi: 'Engineer',
    period: '2020',
    mulai: '10-12-2020',
    berakhir: '30-12-2024'
  }
];

const Kontrak = () => (
  <MainCard title="Data Kontrak">
    <Typography variant="body2">
      <KontrakModal />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </div>
    </Typography>
  </MainCard>
);

export default Kontrak;
