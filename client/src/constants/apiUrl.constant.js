// export const BASE_URL = 'http://103.190.28.147:8081/';
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URI;
export const HCIS_API = 'hcis-api';

// export const BASE_URL_2 = 'https://user1677401524155.requestly.dev/';
export const KARYAWAN_API = `${BACKEND_URL}/${HCIS_API}/employee`;
export const MASTER_JABATAN_API = `${BACKEND_URL}/${HCIS_API}/master/jabatan`;
export const MASTER_API = `${BACKEND_URL}/${HCIS_API}/master`;
// export const KARYAWAN_API = `https://user1677401524155.requestly.dev/api/employee`;
