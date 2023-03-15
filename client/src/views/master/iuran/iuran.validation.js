import * as Yup from 'yup';

export const iuranValidationSchema = Yup.object().shape({
  iuran_type: Yup.string().required('Tipe Iuran wajib diisi!'),
  iuran_beban: Yup.string().required('Beban Iuran wajib diisi!'),
  iuran_persen: Yup.number().required('Persentase Iuran wajib diisi!')
});
