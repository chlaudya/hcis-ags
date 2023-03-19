import * as Yup from 'yup';

export const karyawanValidationSchema = Yup.object().shape({
  karyawan_nip: Yup.string().required('wajib diisi!'),
  karyawan_name: Yup.string().required('wajib diisi!'),
  tempat_tinggal: Yup.string().required('wajib diisi!'),
  tanggal_lahir: Yup.string().required('wajib diisi!'),
  agama: Yup.string().required('wajib diisi!'),
  gender: Yup.string().required('wajib diisi!'),
  status_nikah: Yup.string().required('wajib diisi!'),
  alamat_rumah: Yup.string().required('wajib diisi!'),
  bank_id: Yup.string().required('wajib diisi!'),
  no_rekening: Yup.string().required('wajib diisi!'),
  isActive: Yup.string().required('wajib diisi!'),
  email: Yup.string().required('wajib diisi!'),
  no_handphone: Yup.string().required('wajib diisi!'),
  nonik: Yup.string().required('wajib diisi!'),
  nokk: Yup.string().required('wajib diisi!'),
  nonpwp: Yup.string().required('wajib diisi!'),
  pendidikan_terakhir: Yup.string().required('wajib diisi!'),
  jurusan: Yup.string().required('wajib diisi!'),
  asal_sekolah: Yup.string().required('wajib diisi!'),
  no_bpjs_tenaga_kerja: Yup.string().required('wajib diisi!'),
  no_bpjs_kesehatan: Yup.string().required('wajib diisi!'),
  lampiran_cv: Yup.string().required('wajib diisi!'),
  is_active: Yup.boolean().required('wajib diisi!')
});
