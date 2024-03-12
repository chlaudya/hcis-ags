import axios from 'axios';
import { toast } from 'react-toastify';
import { SET_LOADING_DASHBOARD_DATA, GET_DASHBOARD_DATA } from 'store/actions';
import { DASHBOARD_API } from 'constants/apiUrl.constant';

export const getDashboardData = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_DASHBOARD_DATA,
      payload: true
    });
    axios
      .get(`${DASHBOARD_API}`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_DASHBOARD_DATA,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.header?.errors[0]?.message || err?.message);
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_DASHBOARD_DATA,
          payload: false
        });
      });
  };
};

export const getAllDashboardData = (params) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING_DASHBOARD_ALL_DATA',
      payload: true
    });
    axios
      .get(`${DASHBOARD_API}`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: 'GET_DASHBOARD_ALL_DATA',
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'GET_DASHBOARD_ALL_DATA',
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING_DASHBOARD_ALL_DATA',
          payload: false
        });
      });
  };
};
