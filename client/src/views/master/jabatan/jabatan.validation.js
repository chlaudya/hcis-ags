import * as Yup from 'yup';

export const jabatanValidationSchema = Yup.object().shape({
  jabatanId: Yup.string().required(),
  jabatanName: Yup.string().required(),
  jabatanDesc: Yup.string().required(),
  tunjangan: Yup.number().required(),
  isActive: Yup.number().required()
});
