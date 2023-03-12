import React, { useContext } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MainCard from 'src/ui-component/cards/MainCard';
import { Typography, IconButton } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
// import { ModalContext } from 'src/ui-component/modal';
import { ColumnsJabatan } from './components/ColumnsJabatan';
// import { MODAL_TYPES } from 'src/ui-component/modal/modalConstant';

// Modal
// import AddKaryawan from './modalAdd';

const columns = [
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
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={() => console.log('edit')}
          >
            <Edit style={{ color: blue[900] }} />
          </IconButton>
          <IconButton
            color="warning"
            aria-label="add an alarm"
            onClick={() => console.log('delete')}
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
    id: '1',
    jabatan_id: '001',
    jabatan_name: 'King',
    jabatan_desc: 'Raja',
    tunjangan: 'Mobil',
    is_active: true
  }
];

const Jabatan = () => {
  // const { showModal } = useContext(ModalContext);

  const handleEdit = () => {
    // showModal(MODAL_TYPES.MODAL_EDIT, {
    //     modalTitle: 'View Pending Approval Detail',
    //     children: (
    //         <div>test modal edit</div>
    //         // <ViewFieldApproval
    //         //   id={id}
    //         //   onSubmit={onSubmitApproval}
    //         //   onCancel={hideModal}
    //         // />
    //     )
    // });
  };

  const handleDelete = () => {
    console.log('test');
  };

  return (
    <MainCard title="Data Jabatan">
      <Typography variant="body2">
        {/* <AddJabatan /> */}
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={ColumnsJabatan({ handleEdit, handleDelete })}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Typography>
    </MainCard>
  );
};

export default Jabatan;
