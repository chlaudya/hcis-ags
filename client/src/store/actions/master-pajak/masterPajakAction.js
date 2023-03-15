import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_MASTER_PAJAK,
  SET_LOADING_MASTER_PAJAK_LIST,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { MASTER_API } from 'constants/apiUrl.constant';

export const getMasterPajak = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_PAJAK_LIST,
      payload: true
    });
    axios
      .get(`${MASTER_API}/pajak`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_PAJAK,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_PAJAK_LIST,
          payload: false
        });
      });
  };
};

export const addMasterPajak = (reqBody, hideModal) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_API}/pajak`, reqBody)
      .then((res) => {
        dispatch(getMasterPajak());
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

export const updateMasterPajak = ({ reqBody, hideModal, isDelete }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${MASTER_API}/pajak`, reqBody)
      .then(() => {
        dispatch(getMasterPajak());
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
