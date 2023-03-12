import React from 'react';
import { IconButton } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';

export const ColumnsJabatan = ({ handleEdit, handleDelete }) => {
    const columnsJabatan = [
        { field: 'jabatan_id', headerName: 'Jabatan Id', width: 200 },
        { field: 'jabatan_name', headerName: 'Nama Jabatan', width: 200 },
        { field: 'jabatan_desc', headerName: 'Deskripsi Jabatan ', width: 200 },
        { field: 'tunjangan', headerName: 'Tunjangan', width: 200 },
        { field: 'is_active', headerName: 'Aktif', width: 180 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={handleEdit}>
                            <Edit style={{ color: blue[900] }} />
                        </IconButton>
                        <IconButton color="warning" aria-label="add an alarm" onClick={handleDelete}>
                            <Delete style={{ color: red[900] }} />
                        </IconButton>
                    </>
                );
            }
        }
    ];
    return columnsJabatan;
};
