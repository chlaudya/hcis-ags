import React, { useState } from "react";
import Modal from "react-modal";


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: '50%',
    },
};

function KaryawanModal() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="App">
            <button onClick={setModalOpen}>Open Modal</button>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles}>
                <div>Input Data Karyawan</div>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>
                <input type={"text"}/>             
                <button onClick={() => setModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
}

export default KaryawanModal;
