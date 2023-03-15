import * as Yup from 'yup';

export const unitValidationSchema = Yup.object().shape({
  unit_name: Yup.string().required('Unit name wajib diisi!'),
  unit_description: Yup.string().required('Unit description wajib diisi!')
});
