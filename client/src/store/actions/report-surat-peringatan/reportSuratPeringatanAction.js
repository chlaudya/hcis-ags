import axios from 'axios';
import { REPORT_API } from 'constants/apiUrl.constant';

export const getReportSuratPeringatan = (params) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING_REPORT_SURAT_PERINGATAN',
      payload: true
    });
    axios
      .get(`${REPORT_API}/karyawan_sp`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: 'GET_REPORT_SURAT_PERINGATAN',
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'GET_REPORT_SURAT_PERINGATAN',
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING_REPORT_SURAT_PERINGATAN',
          payload: false
        });
      });
  };
};

export const getAllReportSuratPeringatan = (params) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING_REPORT_ALL_SURAT_PERINGATAN',
      payload: true
    });
    axios
      .get(`${REPORT_API}/karyawan_sp`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: 'GET_REPORT_ALL_SURAT_PERINGATAN',
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'GET_REPORT_ALL_SURAT_PERINGATAN',
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING_REPORT_ALL_SURAT_PERINGATAN',
          payload: false
        });
      });
  };
};
