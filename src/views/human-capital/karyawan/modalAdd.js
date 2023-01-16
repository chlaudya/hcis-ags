import React, { useState } from "react";
import Modal from "react-modal";
import { Select, Box, Button, MenuItem, TextField, FormControl, InputLabel, Stack } from "@mui/material";

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
    overlay: { zIndex: 1000 },
    upload:{
        top:'8px',
        left:'5px'
    }
};



function KaryawanModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [gender, setGender] = React.useState('');
    const [agama, setAgama] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [pendidikan, setPendidikan] = React.useState('');
    const [isActive, setIsActive] = React.useState('');
    const handleGender = (event) => {
        setGender(event.target.value);
    };
    const handleAgama = (event) => {
        setAgama(event.target.value);
    };
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    const handlePendidikan = (event) => {
        setPendidikan(event.target.value);
    };
    const handleChange = (event) => {
        setIsActive(event.target.value);
    };

    return (
        <div className="App">
            <Button variant="text" onClick={setModalOpen}>Input Karyawan</Button>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
                <div>Input Data Karyawan</div>
                <hr />
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '48%' }, }} noValidate autoComplete="off" >
                    <div>
                        <TextField label="NIP" id="k-nip" size="small" />
                        <TextField label="Nama" id="k-nama" size="small" />
                        <TextField label="Tempat Lahir" id="k-tlahir" size="small" />
                        <FormControl sx={{ m: 1, width: '48%' }} size="small">
                            <InputLabel id="label-gender">Jenis Kelamin</InputLabel>
                            <Select labelId="label-gender" id="k-gender" value={gender} label="Gender" onChange={handleGender} >
                                <MenuItem value=""><em>Select One</em></MenuItem>
                                <MenuItem value={'l'}>Laki-Laki</MenuItem>
                                <MenuItem value={'p'}>Perempuan</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '48%' }} size="small">
                            <InputLabel id="label-agama">Agama</InputLabel>
                            <Select labelId="label-agama" id="k-agama" value={agama} label="Agama" onChange={handleAgama} >
                                <MenuItem value=""><em>Select One</em></MenuItem>
                                <MenuItem value={'islam'}>Islam</MenuItem>
                                <MenuItem value={'kristen'}>Kristen</MenuItem>
                                <MenuItem value={'katolik'}>Katolik</MenuItem>
                                <MenuItem value={'hindu'}>Hindu</MenuItem>
                                <MenuItem value={'budha'}>Budha</MenuItem>
                                <MenuItem value={'khonghuchu'}>Kong hu Chu</MenuItem>
                                <MenuItem value={'notdefined'}>Not Defined</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '48%' }} size="small">
                            <InputLabel id="label-status">Status</InputLabel>
                            <Select labelId="label-status" id="k-status" value={status} label="Status" onChange={handleStatus} >
                                <MenuItem value=""><em>Select One</em></MenuItem>
                                <MenuItem value={'K0'}>Belum Menikah</MenuItem>
                                <MenuItem value={'TK0'}>Menikah Anak 0</MenuItem>
                                <MenuItem value={'TK1'}>Menikah Anak 1</MenuItem>
                                <MenuItem value={'TK2'}>Menikah Anak 2</MenuItem>
                                <MenuItem value={'TK3'}>Menikah Anak 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '98%' }, }} noValidate autoComplete="off" >
                    <div>
                        <TextField label="Alamat Rumah" id="k-alamat" size="small" />
                    </div>
                </Box>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '48%' }, }} noValidate autoComplete="off" >
                    <div>
                        <TextField label="Email" id="k-email" size="small" />
                        <TextField label="No. Handphone" id="k-hp" size="small" />
                        <TextField label="No. KK" id="k-kk" size="small" />
                        <TextField label="No. NPWP" id="k-npwp" size="small" />
                        <TextField label="No. BPSJ Ketenagakerjaan" id="k-ketenagakerjaan" size="small" />
                        <TextField label="No. BPSJ Kesehatan" id="k-kesehatan" size="small" />
                    </div>
                </Box>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '48%' }, }} noValidate autoComplete="off" >
                    <div>
                        <FormControl sx={{ m: 1, width: '48%' }} size="small">
                            <InputLabel id="label-pendidikan">Pendidikan</InputLabel>
                            <Select labelId="label-pendidikan" id="k-pendidikan" value={pendidikan} label="Pendidikan" onChange={handlePendidikan} >
                                <MenuItem value=""><em>Select One</em></MenuItem>
                                <MenuItem value={'sd'}>SD</MenuItem>
                                <MenuItem value={'smp'}>SMP</MenuItem>
                                <MenuItem value={'sma'}>SMA/K</MenuItem>
                                <MenuItem value={'d3'}>Diploma 3</MenuItem>
                                <MenuItem value={'s1'}>Strata 1</MenuItem>
                                <MenuItem value={'s2'}>Strata 2</MenuItem>
                                <MenuItem value={'s3'}>Strata 3</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Jurusan" id="k-jurusan" size="small" />
                        <TextField label="Alamat Sekolah" id="k-alamatsekolah" size="small" />
                        <FormControl sx={{ m: 1, width: '48%' }} size="small">
                            <InputLabel id="label-isactive">Is Active</InputLabel>
                            <Select labelId="label-isactive" id="k-isactive" value={isActive} label="Is Active" onChange={handleChange} >
                                <MenuItem value=""><em>Select One</em></MenuItem>
                                <MenuItem value={'1'}>Active</MenuItem>
                                <MenuItem value={'0'}>In Active</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" component="label" style={customStyles.upload}>
                            Upload CV
                            <input hidden accept="pdf/*" multiple type="file" />                          
                        </Button>
                        <TextField disabled label="File name" id="k-tlahir" size="small" />
                    </div>
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

export default KaryawanModal;
