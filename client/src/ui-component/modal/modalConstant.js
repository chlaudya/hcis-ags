import { ModalAdd, ModalEdit, ModalDelete, ModalConfirmation, ModalDetail } from '.';

export const MODAL_TYPES = {
  MODAL_ADD: 'MODAL_ADD',
  MODAL_EDIT: 'MODAL_EDIT',
  MODAL_DELETE: 'MODAL_DELETE',
  MODAL_CONFIRMATION: 'MODAL_CONFIRMATION',
  MODAL_DETAIL: 'MODAL_DETAIL'
};

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.MODAL_ADD]: ModalAdd,
  [MODAL_TYPES.MODAL_EDIT]: ModalEdit,
  [MODAL_TYPES.MODAL_DELETE]: ModalDelete,
  [MODAL_TYPES.MODAL_CONFIRMATION]: ModalConfirmation,
  [MODAL_TYPES.MODAL_DETAIL]: ModalDetail
};
