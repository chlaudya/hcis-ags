import React, { useState } from "react";
import Modal from "react-modal";
import { Button, TextField, Stack } from "@mui/material";
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
        height: '55%'
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

function KontrakModal() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="App">
            <Button variant="text" onClick={setModalOpen}>Input Kontrak</Button>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
                <div>Input Data Kontrak</div>
                <hr /><br/>
                <Stack spacing={2} sx={{ width: 500 }}>
                    <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={KaryawanList}
                        getOptionLabel={(option) => option.value}
                        defaultValue={KaryawanList[0]}
                        renderInput={(params) => (
                            <TextField {...params} label="Karyawan" />
                        )}
                    />
                    <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={LokasiList}
                        getOptionLabel={(option) => option.value}
                        defaultValue={LokasiList[1]}
                        renderInput={(params) => (
                            <TextField {...params} label="Lokasi" />
                        )}
                    />
                    <Autocomplete
                        id="size-small-outlined"
                        size="small"
                        options={PosisiList}
                        getOptionLabel={(option) => option.value}
                        defaultValue={PosisiList[1]}
                        renderInput={(params) => (
                            <TextField {...params} label="Posisi" />
                        )}
                    />
                    <TextField
                        id="stdate"
                        label="Mulai Kontrak"
                        size="small"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="endate"
                        label="Kontrak Selesai"
                        size="small"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>

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
