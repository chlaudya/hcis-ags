import * as Yup from 'yup';

export const jabatanValidationSchema = Yup.object().shape({
  jabatan_name: Yup.string().required('Jabatan name wajib diisi!'),
  jabatan_desc: Yup.string().required('Jabatan description wajib diisi!'),
  tunjangan: Yup.string().required('Tunjangan wajib diisi!')
});
