import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_MASTER_BANK,
  SET_LOADING_MASTER_BANK_LIST,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { MASTER_API } from 'constants/apiUrl.constant';

export const getMasterBank = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_BANK_LIST,
      payload: true
    });
    axios
      .get(`${MASTER_API}/bank`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_BANK,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_BANK_LIST,
          payload: false
        });
      });
  };
};

export const addMasterBank = (reqBody, hideModal) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_API}/bank`, reqBody)
      .then(() => {
        dispatch(getMasterBank());
        toast.success('Data berhasil ditambahkan !');
        hideModal();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.header?.errors[0]?.message || err?.message);
        console.error(err);
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_SUBMIT_BUTTON,
          payload: false
        });
      });
  };
};

export const updateMasterBank = ({ reqBody, hideModal, isDelete }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${MASTER_API}/bank`, reqBody)
      .then(() => {
        dispatch(getMasterBank());
        toast.success(!isDelete ? 'Data berhasil diubah!' : 'Data berhasil dihapus!');
        hideModal();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.header?.errors[0]?.message || err?.message);
        console.error(err);
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_SUBMIT_BUTTON,
          payload: false
        });
      });
  };
};
