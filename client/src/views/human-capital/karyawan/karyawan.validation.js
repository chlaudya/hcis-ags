import * as Yup from 'yup';

export const karyawanValidationSchema = Yup.object().shape({
  karyawanNip: Yup.string().required(),
  karyawanName: Yup.string().required(),
  tempatTinggal: Yup.string().required(),
  tanggalLahir: Yup.string().required(),
  agama: Yup.string().required(),
  gender: Yup.string().required(),
  statusNikah: Yup.string().required(),
  alamatRumah: Yup.string().required(),
  bankName: Yup.string().required(),
  noRekening: Yup.string().required(),
  isActive: Yup.string().required(),
  email: Yup.string().required(),
  noHandphone: Yup.string().required(),
  noNIK: Yup.string().required(),
  noKK: Yup.string().required(),
  noNPWP: Yup.string().required(),
  pendidikanTerakhir: Yup.string().required(),
  jurusan: Yup.string().required(),
  asalSekolah: Yup.string().required(),
  noBPJSTenagaKerja: Yup.string().required(),
  noBPJSKesehatan: Yup.string().required(),
  filePath: Yup.mixed().required()
});
