import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, IconButton } from '@material-ui/core';
import { blue, red } from "@material-ui/core/colors";
import { Delete, Edit } from '@material-ui/icons';

// Modal
import AddKaryawan from './modalAdd';

const columns = [
    { field: 'id', headerName: 'NIP', width: 110 },
    { field: 'lastName', headerName: 'Nama', width: 150 },
    { field: 'firstName', headerName: 'J.K', width: 150 },
    { field: 'age', headerName: 'Alamat', width: 200 },
    { field: 'pendidikan', headerName: 'Pendidikan', width: 180 },
    { field: 'kontak', headerName: 'No.Hp', width: 180 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'noBPJSKet', headerName: 'BPJS Ket', width: 180 },
    { field: 'noBPJSKes', headerName: 'BPJS Kes', width: 180 },
    { field: 'cv', headerName: 'CV', width: 150 },
    {
        field: "action",
        headerName: "Action",
        width: 130,
        renderCell: (cellValues) => {
            return (
                <>
                    <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        onClick={(event) =>
                            this.handleModalDelete(event, cellValues)
                        }
                    >
                        <Edit style={{ color: blue[900] }} />
                    </IconButton>
                    <IconButton
                        color="warning"
                        aria-label="add an alarm"
                        onClick={(event) =>
                            this.handleModalDelete(event, cellValues)
                        }
                    >
                        <Delete style={{ color: red[900] }} />
                    </IconButton>
                </>
            );
        },
    }
];

const rows = [
    { id: '001', lastName: 'Snow', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '002', lastName: 'Lannister', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '003', lastName: 'Lannister', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '004', lastName: 'Stark', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '005', lastName: 'Targaryen', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '006', lastName: 'Melisandre', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '007', lastName: 'Clifford', firstName: 'Perempuan', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '008', lastName: 'Frances', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
    { id: '009', lastName: 'Roxie', firstName: 'Laki - Laki', age: 'Bandung', pendidikan: 'Strata 1', kontak: '08884233822',email:'test@mail.com', status: 'K1', noBPJSKet: '87343948934', noBPJSKes: '74343422', cv:'download' },
];

const Karyawan = () => (
    <MainCard title="Data Karyawan">
        <Typography variant="body2">
            <AddKaryawan />
            <div style={{ height: 500, width: '100%' }}>
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

export default Karyawan;