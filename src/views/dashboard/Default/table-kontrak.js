import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { Typography } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'NIP', width: 110 },
    { field: 'lastName', headerName: 'Nama', width: 150 },
    { field: 'firstName', headerName: 'Posisi', width: 150 },
    {
        field: 'age',
        headerName: 'Tempat Kerja',
        width: 200,
    },
    {
        field: 'mulaikontrak',
        headerName: 'Mulai Kontrak',
        width: 180,
    },
    {
        field: 'habiskontrak',
        headerName: 'Habis Kontrak',
        width: 180,
        
    }
];

const rows = [
    { id: '001', lastName: 'Snow', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '002', lastName: 'Lannister', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '003', lastName: 'Lannister', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '004', lastName: 'Stark', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '005', lastName: 'Targaryen', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '006', lastName: 'Melisandre', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '007', lastName: 'Clifford', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '008', lastName: 'Frances', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
    { id: '009', lastName: 'Roxie', firstName: 'Software Enggineer', age: 'Bandung', habiskontrak: '01-12-2014', mulaikontrak: '01-12-2014' },
];

const KontrakHabis = () => (
    <MainCard title="Data Kontrak Habis">
        <Typography variant="body2">
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Typography>
    </MainCard>
);

export default KontrakHabis;