import * as Yup from 'yup';

export const iuranValidationSchema = Yup.object().shape({
  iuranId: Yup.string().required(),
  tipeIuran: Yup.string().required(),
  beban: Yup.string().required(),
  persentase: Yup.number().required(),
  isActive: Yup.number().required()
});
