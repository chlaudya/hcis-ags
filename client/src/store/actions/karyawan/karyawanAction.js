import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_KARYAWAN_BY_NIP,
  GET_KARYAWAN_DETAIL,
  GET_KARYAWAN_LIST,
  SET_LOADING_KARYAWAN_BY_NIP,
  SET_LOADING_KARYAWAN_DETAIL,
  SET_LOADING_KARYAWAN_LIST,
  SET_LOADING_STOP_KARYAWAN,
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
      .get(`${KARYAWAN_API}`, {
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
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_KARYAWAN_LIST,
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_KARYAWAN_LIST,
          payload: false
        });
      });
  };
};

export const getAllKaryawanList = (params) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING_ALL_KARYAWAN_LIST',
      payload: true
    });
    axios
      .get(`${KARYAWAN_API}`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: 'GET_ALL_KARYAWAN_LIST',
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: 'GET_ALL_KARYAWAN_LIST',
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING_ALL_KARYAWAN_LIST',
          payload: false
        });
      });
  };
};

export const getKaryawanDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KARYAWAN_DETAIL,
      payload: true
    });
    axios
      .get(`${KARYAWAN_API}/detail?karyawan_id=${id}`)
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

export const addKaryawan = (reqBody, redirect) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${KARYAWAN_API}`, reqBody)
      .then((res) => {
        console.log(res);
        toast.success('Data Karyawan berhasil ditambahkan !');
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

export const updateKaryawan = ({ reqBody, redirect, isDelete, hideModal, isStopContract }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${KARYAWAN_API}`, reqBody)
      .then(() => {
        if (isStopContract) {
          toast.success('Kontrak Karyawan berhasil diberhentikan!');
        } else {
          toast.success(
            !isDelete ? 'Data Karyawan berhasil diubah !' : 'Data Karyawan berhasil dihapus!'
          );
        }
        if (hideModal) {
          hideModal();
          dispatch(getKaryawanList());
        } else {
          redirect();
        }
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

export const getKaryawanByNip = (nip) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KARYAWAN_BY_NIP,
      payload: true
    });
    axios
      .get(`${KARYAWAN_API}/by_nip?nip=${nip}`)
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_KARYAWAN_BY_NIP,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        toast.error('Data NIP tidak ditemukan!');
        dispatch({
          type: GET_KARYAWAN_BY_NIP,
          payload: null
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_KARYAWAN_BY_NIP,
          payload: false
        });
      });
  };
};

export const stopKaryawan = (reqBody) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_STOP_KARYAWAN,
      payload: true
    });
    axios
      .post(`${KARYAWAN_API}/stop_karyawan`, reqBody)
      .then(() => {
        toast.success('Karyawan berhasil dinonaktifkan!');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.header?.errors[0]?.message || err?.message);
        console.error(err);
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_STOP_KARYAWAN,
          payload: false
        });
      });
  };
};
