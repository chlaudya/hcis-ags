export const BACKEND_URL = process.env.REACT_APP_BACKEND_URI;
export const HCIS_API = 'hcis-api';

export const KARYAWAN_API = `${BACKEND_URL}/${HCIS_API}/karyawan`;
export const KONTRAK_API = `${BACKEND_URL}/${HCIS_API}/kontrak_kerja`;

export const MASTER_JABATAN_API = `${BACKEND_URL}/${HCIS_API}/master/jabatan`;
export const MASTER_API = `${BACKEND_URL}/${HCIS_API}/master`;
export const REPORT_API = `${BACKEND_URL}/${HCIS_API}/report`;
