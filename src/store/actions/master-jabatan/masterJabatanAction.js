import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_MASTER_JABATAN,
  GET_MASTER_JABATAN_DETAIL,
  SET_LOADING_MASTER_JABATAN_DETAIL,
  SET_LOADING_MASTER_JABATAN_LIST,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { MASTER_JABATAN_API } from 'constants/apiUrl.constant';

export const getMasterJabatan = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_JABATAN_LIST,
      payload: true
    });
    axios
      .get(`${MASTER_JABATAN_API}/?`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_JABATAN,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_JABATAN_LIST,
          payload: false
        });
      });
  };
};

export const getMasterJabatanDetail = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_JABATAN_DETAIL,
      payload: true
    });
    axios
      .get(`${MASTER_JABATAN_API}/detail?`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_JABATAN_DETAIL,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_JABATAN_DETAIL,
          payload: false
        });
      });
  };
};

export const updateMasterJabatan = (reqBody, redirect) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_JABATAN_API}/save`, reqBody)
      .then((res) => {
        console.log(res);
        toast.success('Master Jabatan berhasil ditambahkan !');
        redirect();
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
