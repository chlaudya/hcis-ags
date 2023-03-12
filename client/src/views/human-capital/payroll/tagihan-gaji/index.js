import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MainCard from 'src/ui-component/cards/MainCard';
import {
  Typography,
  IconButton,
  Button,
  TextField,
  Autocomplete,
  Grid,
  Stack
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';

const columns = [
  { field: 'id', headerName: 'NIP', width: 110 },
  { field: 'namakaryawan', headerName: 'Nama Karyawan', width: 300 },
  { field: 'lokasi', headerName: 'Tugas/Jabatan', width: 200 },
  { field: 'posisi', headerName: 'Tempat Tugas', width: 300 },
  { field: 'period', headerName: 'Gaji', width: 150 },
  { field: 'mulai', headerName: 'Tunjangan', width: 180 },
  {
    field: 'berakhir',
    headerName: 'Gaji Dibayar',
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
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '002',
    namakaryawan: 'Lannister',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '003',
    namakaryawan: 'Lannister',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '004',
    namakaryawan: 'Stark',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '005',
    namakaryawan: 'Targaryen',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '006',
    namakaryawan: 'Melisandre',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '007',
    namakaryawan: 'Clifford',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '008',
    namakaryawan: 'Frances',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  },
  {
    id: '009',
    namakaryawan: 'Roxie',
    lokasi: 'Engineer',
    posisi: 'Bandung',
    period: 'Rp. 2.000.000',
    mulai: 'Rp. 500.000',
    berakhir: 'Rp. 2.500.000'
  }
];

const TipeTunjangan2 = [
  { id: '001', value: 'Tunjangan 1' },
  { id: '002', value: 'Tunjangan 2' }
];

const Kontrak = () => (
  <MainCard title="Generate Tagihan Gaji">
    <Typography variant="body2">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Stack spacing={1} sx={{ width: 500 }}>
            <TextField
              id="endate"
              label="Periode"
              size="small"
              type="date"
              defaultValue="2017-05-24"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Autocomplete
              id="k-tipetunjangan"
              options={TipeTunjangan2}
              getOptionLabel={(option) => option.value}
              size="small"
              renderInput={(params) => <TextField {...params} label="Unit Bisnis" />}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={1} direction="row">
            <Button variant="contained">Generate Tagihan Gaji</Button>
            <Button variant="contained" color="warning">
              View Data
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <hr />
      <div style={{ height: 480, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={6} rowsPerPageOptions={[5]} />
      </div>
    </Typography>
  </MainCard>
);

export default Kontrak;
