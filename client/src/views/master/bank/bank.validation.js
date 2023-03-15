import * as Yup from 'yup';

export const bankValidationSchema = Yup.object().shape({
  bank_name: Yup.string().required('Bank Name harus diisi'),
  bank_desc: Yup.string().required('Bank Description harus diisi')
});
