import { createContext } from 'react';

const ModalContext = createContext({
  showModal: () => null,
  hideModal: () => null,
  isOpen: false,
  state: {},
});

export default ModalContext;
