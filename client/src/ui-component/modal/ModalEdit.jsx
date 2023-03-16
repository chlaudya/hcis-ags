import { Dialog } from '@material-ui/core';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { X } from 'react-feather';
import { ModalHeader, ModalBody } from 'reactstrap';
import ModalContext from './modalContext';

const ModalEdit = () => {
  const { state, isOpen, hideModal } = useContext(ModalContext);
  const { modalProps } = state ?? {};

  const {
    children,
    modalTitle,
    className,
    handleModalToggle,
    size = 'lg',
    ...restProps
  } = modalProps ?? {};

  const cssClasses = classNames('modal-edit', {
    className
  });

  return (
    <Dialog open={isOpen} className={cssClasses} size={size} centered {...restProps}>
      <ModalHeader
        className="bg-primary p-3 position-relative ti-text-color"
        style={{
          color: 'white'
        }}
      >
        {modalTitle}
        <X className="position-absolute cursor-pointer" onClick={hideModal} style={{ right: 10 }} />
      </ModalHeader>
      <ModalBody className="p-2">{children}</ModalBody>
    </Dialog>
  );
};

export default ModalEdit;
