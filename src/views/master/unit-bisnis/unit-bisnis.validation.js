import * as Yup from 'yup';

export const unitValidationSchema = Yup.object().shape({
  unitId: Yup.string().required(),
  unitName: Yup.string().required(),
  unitDesc: Yup.string().required(),
  isActive: Yup.number().required()
});
