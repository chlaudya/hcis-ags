import React, { useState } from 'react';
import ModalContext from './modalContext';
import { MODAL_COMPONENTS } from './modalConstant';

export const ModalProvider = ({ children }) => {
  const [state, setState] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { modalType, modalProps } = state || {};

  const showModal = (modalType, modalProps) => {
    setState({
      ...state,
      modalType,
      modalProps,
    });
    setIsOpen(true);
  };

  const hideModal = () => {
    setState({
      ...state,
      modalType: null,
      modalProps: {},
    });
    setIsOpen(false);
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id='Modal' {...modalProps} />;
  };

  return (
    <ModalContext.Provider
      value={{
        state,
        isOpen,
        showModal,
        hideModal,
      }}
    >
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
