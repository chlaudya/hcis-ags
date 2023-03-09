import axios from 'axios';
import { generateCsurfToken } from '../redux/actions/csurf/csurfActions';

const csrfProtection = {
  setHeaderCsrfToken: async function () {
    let csurfToken = await generateCsurfToken();
    axios.defaults.headers.common['X-CSRF-Token'] = csurfToken;
  },
  deleteHeaderCsrfToken: () => {
    delete axios.defaults.headers.common['X-CSRF-Token'];
  },
};

export default csrfProtection;
