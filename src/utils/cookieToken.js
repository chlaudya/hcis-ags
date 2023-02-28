import axios from 'axios';
// import { history } from '../history';
import setAuthToken from './setAuthToken';

const BASE_URL = process.env.REACT_APP_BACKEND_URI || '';
const COOKIE_NAME = 'ags-token';

const cookieToken = {
  set: function (token) {
    if (token) {
      setAuthToken(token);
      localStorage.setItem(COOKIE_NAME, token);
    }
  },
  publicToken: function () {
    return axios.get(BASE_URL + `/api/v1/auth/cookie`, {
      withCredentials: true
    });
  },
  privateToken: function () {
    return localStorage.getItem(COOKIE_NAME);
  },
  isExistPrivateToken: function () {
    return this.privateToken() !== null;
  },
  signInWithToken: function () {
    this.publicToken()
      .then((response) => {
        let { cookie } = response.data;
        cookie = cookie || null;

        if (cookie !== null && !this.isExistPrivateToken()) {
          console.log(`login with token`);
          this.verifyToken(cookie);
        } else if (cookie === null && this.isExistPrivateToken()) {
          localStorage.removeItem(COOKIE_NAME);
          throw new Error(`no public cookie`);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  // verifyToken: function (token) {
  //   axios
  //     .post(
  //       BASE_URL + `/api/v1/auth/verify`,
  //       { token: token },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(`login with token success`);
  //       this.set(response.data.cookie);
  //       setAuthToken(response.data.cookie);
  //       history.push('/');
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 300);
  //     })
  //     .catch((error) => {
  //       history.push('/error/unauthorized');
  //     });
  // },
  remove: function () {
    localStorage.removeItem(COOKIE_NAME);
    // axios.delete(BASE_URL + `/api/v1/auth/cookie`, {
    //   withCredentials: true,
    // });
  }
};

export default cookieToken;
