import React, { useState } from "react";
import Modal from "react-modal";
import { Button, TextField, Box, Stack, Grid } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: '60%',
        height: '70%'
    },
    overlay: { zIndex: 1000 }
};

const KaryawanList = [
    { id: '001', value: 'Snow' },
    { id: '002', value: 'Lannister' },
    { id: '003', value: 'Stark' }
];

const LokasiList = [
    { id: '001', value: 'Bandung' },
    { id: '002', value: 'Jakarta' }
];

const PosisiList = [
    { id: '001', value: 'Engineer' },
    { id: '002', value: 'Analis' }
];

const TipeTunjangan = [
    { id: '001', value: 'Tunjangan 1' },
    { id: '002', value: 'Tunjangan 2' }
];

function KontrakModal() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="App">
            <Button variant="text" onClick={setModalOpen}>Input Kontrak</Button>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
                <div>Input Data Kontrak</div>
                <hr /><br />
                <Box sx={{ flexGrow: 1 }} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Autocomplete id="k-nip" options={KaryawanList} getOptionLabel={(option) => option.value} size="small" renderInput={(params) => (<TextField {...params} label="NIP" />)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField disabled label="Nama" id="k-nama" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField disabled label="KTP" id="k-ktp" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField disabled label="Tempat Lahir" id="k-tempatlahir" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete id="k-unitbisnis" options={PosisiList} getOptionLabel={(option) => option.value} size="small" renderInput={(params) => (<TextField {...params} label="Unit Bisnis" />)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField disabled label="Tanggal Lahir" id="k-tgllahir" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete id="k-tempattugas" options={LokasiList} getOptionLabel={(option) => option.value} size="small" renderInput={(params) => (<TextField {...params} label="Tempat Tugas" />)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete id="k-tipetunjangan" options={TipeTunjangan} getOptionLabel={(option) => option.value} size="small" renderInput={(params) => (<TextField {...params} label="Tipe Tunjangan" />)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete id="k-jabatan" options={LokasiList} getOptionLabel={(option) => option.value} size="small" renderInput={(params) => (<TextField {...params} label="Jabatan" />)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="stdate" label="Mulai Kontrak" size="small" type="date" defaultValue="2017-05-24" fullWidth InputLabelProps={{ shrink: true, }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField disabled label="Gaji" id="k-gaji" size="small" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="endate" label="Selesai Kontrak" size="small" type="date" defaultValue="2017-05-24" fullWidth InputLabelProps={{ shrink: true, }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField disabled label="Uang Telekomunikasi" id="k-uangtelekomunikasi" size="small" fullWidth />
                        </Grid>
                    </Grid>
                </Box>
                <hr />
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Submit</Button>
                    <Button variant="outlined" color="error" onClick={() => setModalOpen(false)}>Cancel</Button>
                </Stack>
            </Modal>
        </div>
    );
}

export default KontrakModal;
