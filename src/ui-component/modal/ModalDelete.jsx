import React, { useContext } from 'react';
import { X } from 'react-feather';
import classNames from 'classnames';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ModalContext from './modalContext';

const ModalDelete = (props) => {
    const { state, isOpen, hideModal } = useContext(ModalContext);
    const { modalProps } = state ?? {};

    const { children, modalTitle, className, handleModalToggle, size = 'lg', ...restProps } = modalProps ?? {};

    const cssClasses = classNames('modal-delete', {
        className
    });

    return (
        <Modal isOpen={isOpen} className={cssClasses} size={size} centered {...restProps}>
            <ModalHeader
                className="bg-primary px-2 position-relative"
                style={{
                    borderRadius: '5px 5px 0 0',
                    color: 'white'
                }}
            >
                {modalTitle}
                <X className="position-absolute cursor-pointer" onClick={hideModal} style={{ right: 10 }} />
            </ModalHeader>
            <ModalBody className="p-2">{children}</ModalBody>
        </Modal>
    );
};

export default ModalDelete;
