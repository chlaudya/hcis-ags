import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_MASTER_JABATAN,
  SET_LOADING_MASTER_JABATAN_LIST,
  SET_LOADING_SUBMIT_BUTTON,
  GET_DROPDOWN_JABATAN
} from 'store/actions';
import { MASTER_API } from 'constants/apiUrl.constant';

export const getMasterJabatan = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_JABATAN_LIST,
      payload: true
    });
    axios
      .get(`${MASTER_API}/jabatan`, {
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

export const addMasterJabatan = (reqBody, hideModal) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_API}/jabatan`, reqBody)
      .then((res) => {
        dispatch(getMasterJabatan());
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

export const updateMasterJabatan = ({ reqBody, hideModal, isDelete }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${MASTER_API}/jabatan`, reqBody)
      .then(() => {
        dispatch(getMasterJabatan());
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

export const getDropdownJabatan = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_JABATAN_LIST,
      payload: true
    });
    axios
      .get(`${MASTER_API}/jabatan`)
      .then((response) => {
        if (response.data) {
          const dropdownJabatan = response.data.data.data.map((item) => {
            return { label: item.jabatan_name, value: item.jabatan_id };
          });
          dispatch({
            type: GET_DROPDOWN_JABATAN,
            payload: dropdownJabatan
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
