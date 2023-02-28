import React, { useContext } from 'react';
import { X } from 'react-feather';
import classNames from 'classnames';
import { Modal, ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import ModalContext from './modalContext';

const ModalConfirmation = () => {
    const { state, isOpen, hideModal } = useContext(ModalContext);
    const { modalProps } = state ?? {};

    const {
        children,
        modalTitle,
        modalDescription,
        handleConfirm,
        confirmText,
        cancelText,
        className,
        handleModalToggle,
        isSubmitting,
        ...restProps
    } = modalProps ?? {};

    const cssClasses = classNames('modal-confirmation', {
        className
    });

    return (
        <Modal isOpen={isOpen} className={cssClasses} size="sm" centered {...restProps}>
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
            <ModalBody className="p-2">
                <h6>{modalDescription}</h6>
                <Button color="primary" className="mt-2" onClick={handleConfirm}>
                    {isSubmitting ? (
                        <>
                            <Spinner size="sm" />
                            <span> Loading</span>
                        </>
                    ) : (
                        confirmText
                    )}
                </Button>
                <Button outline color="primary" className="mt-2 ml-1" onClick={hideModal}>
                    {cancelText}
                </Button>
            </ModalBody>
        </Modal>
    );
};

export default ModalConfirmation;
