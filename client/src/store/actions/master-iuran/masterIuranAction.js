import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_MASTER_IURAN,
  SET_LOADING_MASTER_IURAN_LIST,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { MASTER_API } from 'constants/apiUrl.constant';

export const getMasterIuran = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_IURAN_LIST,
      payload: true
    });
    axios
      .get(`${MASTER_API}/iuran`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_IURAN,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_IURAN_LIST,
          payload: false
        });
      });
  };
};

export const addMasterIuran = (reqBody, hideModal) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_API}/iuran`, reqBody)
      .then(() => {
        dispatch(getMasterIuran());
        toast.success('Data berhasil ditambahkan!');
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

export const updateMasterIuran = ({ reqBody, hideModal, isDelete }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${MASTER_API}/iuran`, reqBody)
      .then(() => {
        dispatch(getMasterIuran());
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
