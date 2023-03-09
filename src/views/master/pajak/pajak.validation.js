import * as Yup from 'yup';

export const pajakValidationSchema = Yup.object().shape({
  tipePajak: Yup.string().required(),
  status: Yup.string().required(),
  persentase: Yup.string().required(),
  isActive: Yup.number().required()
});
