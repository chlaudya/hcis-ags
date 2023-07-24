import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_KONTRAK_DETAIL,
  GET_KONTRAK_LIST,
  SET_LOADING_KONTRAK_BY_NIP,
  SET_LOADING_KONTRAK_DETAIL,
  SET_LOADING_KONTRAK_LIST,
  SET_LOADING_SUBMIT_BUTTON
} from 'store/actions';
import { KONTRAK_API } from 'constants/apiUrl.constant';

export const getKontrakList = (params) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KONTRAK_LIST,
      payload: true
    });
    axios
      .get(`${KONTRAK_API}`, {
        params: {
          ...params
        }
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_KONTRAK_LIST,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_KONTRAK_LIST,
          payload: []
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_KONTRAK_LIST,
          payload: false
        });
      });
  };
};

export const getKontrakDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KONTRAK_DETAIL,
      payload: true
    });
    axios
      .get(`${KONTRAK_API}/detail?kontrak_id=${id}`)
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_KONTRAK_DETAIL,
            payload: response.data.data
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        dispatch({
          type: SET_LOADING_KONTRAK_DETAIL,
          payload: false
        });
      });
  };
};

export const addKontrak = (reqBody, redirect) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .post(`${KONTRAK_API}`, reqBody)
      .then((res) => {
        console.log(res);
        toast.success('Data Kontrak berhasil ditambahkan !');
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

export const updateKontrak = ({ reqBody, redirect, isDelete, hideModal }) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_SUBMIT_BUTTON,
      payload: true
    });
    axios
      .put(`${KONTRAK_API}`, reqBody)
      .then(() => {
        dispatch(getKontrakList());
        toast.success(
          !isDelete ? 'Data Kontrak berhasil diubah!' : 'Data Kontrak berhasil dihapus!'
        );
        if (hideModal) {
          hideModal();
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

export const getKontrakByNip = (nip) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_KONTRAK_BY_NIP,
      payload: true
    });
    axios
      .get(`${KONTRAK_API}?nip=${nip}`)
      .then((response) => {
        if (response.data) {
          dispatch({
            type: GET_KONTRAK_DETAIL,
            payload: response.data.data
          });
        }
      })
      .catch((err) => {
        toast.error('Data NIP tidak ditemukan!');
        dispatch({
          type: GET_KONTRAK_DETAIL,
          payload: null
        });
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING_KONTRAK_BY_NIP,
          payload: false
        });
      });
  };
};
