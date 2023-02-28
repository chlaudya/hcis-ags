import axios from 'axios';
// import { toast } from 'react-toastify';
import {
  GET_KARYAWAN_DETAIL,
  GET_KARYAWAN_LIST,
  SET_LOADING_KARYAWAN_DETAIL,
  SET_LOADING_KARYAWAN_LIST,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { KARYAWAN_API } from 'constants/apiUrl.constant';

export const getKaryawanList = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KARYAWAN_LIST,
      payload: true
    });
    axios
      .get(`${KARYAWAN_API}?`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_KARYAWAN_LIST,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_KARYAWAN_LIST,
          payload: false
        });
      });
  };
};

export const getKaryawanDetail = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KARYAWAN_DETAIL,
      payload: true
    });
    axios
      .get(`${KARYAWAN_API}/detail?`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_KARYAWAN_DETAIL,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_KARYAWAN_DETAIL,
          payload: false
        });
      });
  };
};
