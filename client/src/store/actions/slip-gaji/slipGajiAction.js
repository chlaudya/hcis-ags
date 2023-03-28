import axios from 'axios';
import { GET_GENERATE_SLIP_GAJI, SET_LOADING_GENERATE_SLIP_GAJI } from 'store/actions';
import { SLIP_GAJI_API } from 'constants/apiUrl.constant';

export const getGenerateSlipGaji = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_GENERATE_SLIP_GAJI,
      payload: true
    });
    axios
      .get(SLIP_GAJI_API, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_GENERATE_SLIP_GAJI,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_GENERATE_SLIP_GAJI,
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_GENERATE_SLIP_GAJI,
          payload: false
        });
      });
  };
};
