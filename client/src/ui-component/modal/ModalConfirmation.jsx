import React, { useContext } from 'react';
import { X } from 'react-feather';
import classNames from 'classnames';
import { ModalHeader, ModalBody, Button, Spinner } from 'reactstrap';
import ModalContext from './modalContext';
import { Dialog } from '@material-ui/core';

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
    disabled,
    ...restProps
  } = modalProps ?? {};

  const cssClasses = classNames('modal-confirmation', {
    className
  });

  return (
    <Dialog open={isOpen} className={cssClasses} size="sm" centered {...restProps}>
      <ModalHeader
        className="bg-danger p-3 position-relative ti-text-color"
        style={{
          color: 'white'
        }}
      >
        {modalTitle}
        <X className="position-absolute cursor-pointer" onClick={hideModal} style={{ right: 10 }} />
      </ModalHeader>
      <ModalBody className="p-2">
        <h6 className="p-3">{modalDescription}</h6>
        {children}
        <Button color="danger" className="m-2" onClick={handleConfirm} disabled={disabled}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" />
              <span> Loading</span>
            </>
          ) : (
            confirmText
          )}
        </Button>
        <Button outline color="danger" className="m-2" onClick={hideModal}>
          {cancelText}
        </Button>
      </ModalBody>
    </Dialog>
  );
};

export default ModalConfirmation;
