import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_DROPDOWN_UNIT_BISNIS,
  GET_MASTER_UNIT_BISNIS,
  SET_LOADING_MASTER_UNIT_BISNIS,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { MASTER_API } from 'constants/apiUrl.constant';

export const getMasterUnitBisnis = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_UNIT_BISNIS,
      payload: true
    });
    axios
      .get(`${MASTER_API}/unit`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_UNIT_BISNIS,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_UNIT_BISNIS,
          payload: false
        });
      });
  };
};

export const addMasterUnitBisnis = (reqBody, hideModal) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_API}/unit`, reqBody)
      .then((res) => {
        dispatch(getMasterUnitBisnis());
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

export const updateMasterUnitBisnis = ({ reqBody, hideModal, isDelete }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${MASTER_API}/unit`, reqBody)
      .then(() => {
        dispatch(getMasterUnitBisnis());
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

export const getDropdownUnitBisnis = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_UNIT_BISNIS,
      payload: true
    });
    axios
      .get(`${MASTER_API}/unit`)
      .then((response) => {
        if (response.data) {
          const dropdownUnitBisnis = response.data.data.data.map((item) => {
            return { label: item.unit_name, value: item.unit_id };
          });
          dispatch({
            type: GET_DROPDOWN_UNIT_BISNIS,
            payload: dropdownUnitBisnis
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_UNIT_BISNIS,
          payload: false
        });
      });
  };
};
