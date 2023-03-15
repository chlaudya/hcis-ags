import * as Yup from 'yup';

export const pajakValidationSchema = Yup.object().shape({
  pajak_persen: Yup.number().required('Persentase wajib diisi!'),
  pajak_status: Yup.string().required('Status wajib diisi!'),
  pajak_type: Yup.string().required('Tipe wajib diisi!')
});
