import * as Yup from 'yup';

export const bankValidationSchema = Yup.object().shape({
  bankId: Yup.string().required(),
  namaBank: Yup.string().required(),
  isActive: Yup.number().required()
});
