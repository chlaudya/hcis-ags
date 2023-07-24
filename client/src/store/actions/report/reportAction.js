import axios from 'axios';
// import { toast } from 'react-toastify';
import {
  GET_REPORT_ALL_TAGIHAN_GAJI,
  GET_REPORT_TAGIHAN_GAJI,
  SET_LOADING_REPORT_TAGIHAN_GAJI
} from 'store/actions';
import { REPORT_API } from 'constants/apiUrl.constant';

export const getReportTagihanGaji = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_REPORT_TAGIHAN_GAJI,
      payload: true
    });
    axios
      .get(`${REPORT_API}/tagihan_gaji`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_REPORT_TAGIHAN_GAJI,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_REPORT_TAGIHAN_GAJI,
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_REPORT_TAGIHAN_GAJI,
          payload: false
        });
      });
  };
};

export const getAllReportTagihanGaji = (params) => {
  return async (dispatch) => {
    axios
      .get(`${REPORT_API}/tagihan_gaji`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_REPORT_ALL_TAGIHAN_GAJI,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_REPORT_ALL_TAGIHAN_GAJI,
          payload: []
        });
      });
  };
};
