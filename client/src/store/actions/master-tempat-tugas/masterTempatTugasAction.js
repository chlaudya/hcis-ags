import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_DROPDOWN_TEMPAT_TUGAS,
  GET_MASTER_TEMPAT_TUGAS,
  SET_LOADING_MASTER_TEMPAT_TUGAS,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { MASTER_API } from 'constants/apiUrl.constant';

export const getMasterTempatTugas = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_TEMPAT_TUGAS,
      payload: true
    });
    axios
      .get(`${MASTER_API}/tempat_tugas`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_MASTER_TEMPAT_TUGAS,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_TEMPAT_TUGAS,
          payload: false
        });
      });
  };
};

export const addMasterTempatTugas = (reqBody, hideModal) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${MASTER_API}/tempat_tugas`, reqBody)
      .then((res) => {
        dispatch(getMasterTempatTugas());
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

export const updateMasterTempatTugas = ({ reqBody, hideModal, isDelete }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${MASTER_API}/tempat_tugas`, reqBody)
      .then(() => {
        dispatch(getMasterTempatTugas());
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

export const getDropdownTempatTugas = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_MASTER_TEMPAT_TUGAS,
      payload: true
    });
    axios
      .get(`${MASTER_API}/tempat_tugas`)
      .then((response) => {
        if (response.data) {
          const dropdownTempatTugas = response.data.data.data.map((item) => {
            return { label: item.lokasi_tempat_tugas, value: item.tempat_tugas_id };
          });
          dispatch({
            type: GET_DROPDOWN_TEMPAT_TUGAS,
            payload: dropdownTempatTugas
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_MASTER_TEMPAT_TUGAS,
          payload: false
        });
      });
  };
};
